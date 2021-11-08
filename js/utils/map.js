import {arrayGuests} from './data-object.js';
//создаем фрагмент документа и ищем селектор поля адреса
const similarListFragment = document.createDocumentFragment();
const address = document.querySelector('#address');
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

//Запись в поле адреса у кексобукинга координаты центральной метки
mainPinMarker.on('moveend', (evt) => {
  address.value = `${Math.round((evt.target.getLatLng().lat)*100000)/100000}, ${Math.round((evt.target.getLatLng().lng)*100000)/100000}`;
});

//делаем темплейт(описание балуна) и вставляем его в метки
const points = [];
for (let i = 0; i <= arrayGuests.length - 1; i++) {
  let typeRus = '';
  switch (arrayGuests[i].offer.type) {
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

  //темплейт и копируемый блок
  const template = document.querySelector('#card').content.querySelector('.popup');
  const adsElement = template.cloneNode(true);
  adsElement.querySelector('.popup__title').textContent = arrayGuests[i].offer.title;
  adsElement.querySelector('.popup__text--address').textContent = arrayGuests[i].offer.address ;
  adsElement.querySelector('.popup__text--price').textContent = `${arrayGuests[i].offer.price} ₽/ночь`;
  adsElement.querySelector('.popup__type').textContent = typeRus;
  adsElement.querySelector('.popup__text--capacity').textContent = `${arrayGuests[i].offer.rooms} комнаты для ${arrayGuests[i].offer.guests} гостей`;
  adsElement.querySelector('.popup__text--time').textContent = `Заезд после ${arrayGuests[i].offer.checkin} выезд до ${arrayGuests[i].offer.checkout}`;
  adsElement.querySelector('.popup__feature--wifi').textContent = 'Wi-fi';
  adsElement.querySelector('.popup__feature--dishwasher').textContent = 'Посудомоечная машина';
  adsElement.querySelector('.popup__feature--parking').textContent = 'Парковка';
  adsElement.querySelector('.popup__feature--washer').textContent = 'Стиральная машина';
  adsElement.querySelector('.popup__feature--elevator').textContent = 'Лифт';
  adsElement.querySelector('.popup__feature--conditioner').textContent = 'Кондиционер';
  adsElement.querySelector('.popup__description').textContent = arrayGuests[i].offer.description;
  adsElement.querySelector('.popup__photo').setAttribute('src', arrayGuests[i].offer.photos);
  adsElement.querySelector('.popup__avatar').setAttribute('src', '');
  adsElement.querySelector('.popup__avatar').setAttribute('src', arrayGuests[i].author.avatar);

  //Если значения у строки нет, то мы удаляем этот элемент
  if (!adsElement.textContent) {
    adsElement.parentNode.removeChild(adsElement);
  }
  const adLabel = { //при каждой проходке цикла даем значение координатам и записываем темплейт в card
    card: similarListFragment.appendChild(adsElement),
    lat: arrayGuests[i].location.lat,
    lng: arrayGuests[i].location.lng,
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


