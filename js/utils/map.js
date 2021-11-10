import {showAlert} from './allert-message.js';
//создаем фрагмент документа и ищем селектор поля адреса
const similarListFragment = document.createDocumentFragment();
const address = document.querySelector('#address');
//const adFormReset = document.querySelector('.ad-form__reset');
//грузим карту
const map = L.map('map-canvas')
  .on('load', () => {
  })
  .setView({
    lat: 35.681729,
    lng: 139.753927,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
//делаем тип иконки
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
//выставляем адрес центральной иконки
const mainPinMarker = L.marker(
  {
    lat: 35.681729, //даем иконке адрес при загрузке страницы
    lng: 139.753927,
  },
  {draggable: true, //говорим что можем ее двигать
    icon: mainPinIcon, //добавляем тип иконки
  },
);
mainPinMarker.addTo(map);

//Запись в поле адреса у кексобукинга координат центральной метки
mainPinMarker.on('moveend', (evt) => {
  address.value = `${Math.round((evt.target.getLatLng().lat)*100000)/100000}, ${Math.round((evt.target.getLatLng().lng)*100000)/100000}`;
});

//получаем данные
fetch(
  'https://24.javascript.pages.academy/keksobooking/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => response.json())
  .then((data) => {
    const points = [];
    for (let i = 0; i <= data.length - 1; i++) {

      let typeRus = '';
      switch (data[i].offer.type) {
        case 'house': typeRus = 'Дом';
          break;
        case 'palace': typeRus = 'Дворец';
          break;
        case 'flat': typeRus = 'Квартира';
          break;
        case 'bungalow' : typeRus = 'Бунгало';
          break;
        case 'hotel' : typeRus = 'Отель';
          break;
      }
      const template = document.querySelector('#card').content.querySelector('.popup');
      const adsElement = template.cloneNode(true);
      adsElement.querySelector('.popup__feature--dishwasher').style.display = 'none';
      adsElement.querySelector('.popup__feature--parking').style.display = 'none';
      adsElement.querySelector('.popup__feature--washer').style.display = 'none';
      adsElement.querySelector('.popup__feature--elevator').style.display = 'none';
      adsElement.querySelector('.popup__feature--conditioner').style.display = 'none';
      adsElement.querySelector('.popup__feature--wifi').style.display = 'none';
      //фьючерсов может не быть, делаем проверку, иначе оставляем в none. Если не сделать балунов не будет на карте.
      if (data[i].offer.features) {
        for (let j = 0; j <= data[i].offer.features.length - 1; j++) {
          switch (data[i].offer.features[j]) {
            case ('wifi'): adsElement.querySelector('.popup__features').style.display = 'block';
              adsElement.querySelector('.popup__feature--wifi').style.display = 'inline-block';
              break;
            case ('washer') : adsElement.querySelector('.popup__features').style.display = 'block';
              adsElement.querySelector('.popup__feature--washer').style.display = 'inline-block';
              break;
            case ('elevator') : adsElement.querySelector('.popup__features').style.display = 'block';
              adsElement.querySelector('.popup__feature--elevator').style.display = 'inline-block';
              break;
            case ('parking') : adsElement.querySelector('.popup__features').style.display = 'block';
              adsElement.querySelector('.popup__feature--parking').style.display = 'inline-block';
              break;
            case ('dishwasher') : adsElement.querySelector('.popup__features').style.display = 'block';
              adsElement.querySelector('.popup__feature--dishwasher').style.display = 'inline-block';
              break;
            case ('conditioner') : adsElement.querySelector('.popup__features').style.display = 'block';
              adsElement.querySelector('.popup__feature--conditioner').style.display = 'inline-block';
              break;

          }
        }
      }

      //темплейт и копируемый блок
      adsElement.querySelector('.popup__title').textContent = data[i].offer.title;
      adsElement.querySelector('.popup__text--address').textContent = data[i].offer.address;
      adsElement.querySelector('.popup__text--price').textContent = `${data[i].offer.price} ₽/ночь`;
      adsElement.querySelector('.popup__type').textContent = typeRus;
      adsElement.querySelector('.popup__text--capacity').textContent = `${data[i].offer.rooms} комнаты для ${data[i].offer.guests} гостей`;
      adsElement.querySelector('.popup__text--time').textContent = `Заезд после ${data[i].offer.checkin} выезд до ${data[i].offer.checkout}`;
      adsElement.querySelector('.popup__description').textContent = data[i].offer.description;
      adsElement.querySelector('.popup__photo').setAttribute('src', data[i].offer.photos);
      adsElement.querySelector('.popup__avatar').setAttribute('src', '');
      adsElement.querySelector('.popup__avatar').setAttribute('src', data[i].author.avatar);

      const adLabel = { //при каждой проходке цикла даем значение координатам и записываем темплейт в card
        card: similarListFragment.appendChild(adsElement),
        lat: data[i].location.lat,
        lng: data[i].location.lng,
      };
      points[i] = adLabel; //lat, lng, card записываем в элемент массива
    }
    points.forEach(({lat, lng, card}) => { //для каждого points[i] делаем:
      const icon = L.icon({ //вид иконок
        iconUrl: 'img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      const marker = L.marker(//вставляем расположение
        {
          lat,
          lng,
        },
        {
          icon,//вставляем вид иконок
        },
      );

      marker
        .addTo(map)//добавили на карту
        .bindPopup(card);//вставили темплейт для каждой метки
    });
  })
  .catch (() => {
    showAlert;
  });

//Заготовка для очищения балуна, пока не работает. Уточняю у кураторов курса
/*adFormReset.addEventListener('click', () => {
  console.log('Клик произошел');
  L.marker.closeTultip;
  L.marker.closePopup;
});*/
