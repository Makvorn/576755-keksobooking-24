import {MINIMAL_NUMBER_BALUN, ICON_SIZE_BALUN, ICON_ANCHOR_BALUN} from './constants.js';
import {map} from './map.js';

let markerGroup;
const getBalun = (dataBalun) => {
  const similarListFragment = document.createDocumentFragment();
  const copyData = dataBalun.slice();
  const dataTens = [];
  if (dataBalun.length > MINIMAL_NUMBER_BALUN) {
    for (let i = 0; i < MINIMAL_NUMBER_BALUN; i++) {
      const getIndex = Math.floor(Math.random() * copyData.length);
      const getRemoved = copyData.splice(getIndex, 1);
      dataTens.push(getRemoved[0]);
    }
  }
  else {
    for (let i = 0; i < dataBalun.length; i++) {
      const getIndex = Math.floor(Math.random() * copyData.length);
      const getRemoved = copyData.splice(getIndex, 1);
      dataTens.push(getRemoved[0]);
    }
  }
  const points = [];
  for (let i = 0; i <= dataTens.length - 1; i++) {
    let typeRus = '';
    switch (dataTens[i].offer.type) {
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
    adsElement.querySelector('.popup__photo').style.display = 'none';
    //фьючерсов может не быть, делаем проверку, иначе оставляем в none. Если не сделать балунов не будет на карте.
    if (dataTens[i].offer.features) {
      for (let j = 0; j <= dataTens[i].offer.features.length - 1; j++) {
        switch (dataTens[i].offer.features[j]) {
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

    const photoTemplate = adsElement.querySelector('.popup__photo');
    if (dataTens[i].offer.photos) {
      adsElement.querySelector('.popup__photo').style.display = 'block';
      adsElement.querySelector('.popup__photo').setAttribute('src', dataTens[i].offer.photos[0]);
      for (let j = 1; j <= dataTens[i].offer.photos.length - 1; j++) {
        const photo = photoTemplate.cloneNode(true);
        photo.setAttribute('src', dataTens[i].offer.photos[j]);
        adsElement.querySelector('.popup__photos').appendChild(photo);
      }
    }

    //темплейт и копируемый блок
    adsElement.querySelector('.popup__title').textContent = dataTens[i].offer.title;
    adsElement.querySelector('.popup__text--address').textContent = dataTens[i].offer.address;
    adsElement.querySelector('.popup__text--price').textContent = `${dataTens[i].offer.price} ₽/ночь`;
    adsElement.querySelector('.popup__type').textContent = typeRus;
    adsElement.querySelector('.popup__text--capacity').textContent = `${dataTens[i].offer.rooms} комнаты для ${dataTens[i].offer.guests} гостей`;
    adsElement.querySelector('.popup__text--time').textContent = `Заезд после ${dataTens[i].offer.checkin} выезд до ${dataTens[i].offer.checkout}`;
    adsElement.querySelector('.popup__description').textContent = dataTens[i].offer.description;
    adsElement.querySelector('.popup__avatar').setAttribute('src', '');
    adsElement.querySelector('.popup__avatar').setAttribute('src', dataTens[i].author.avatar);


    const adLabel = { //при каждой проходке цикла даем значение координатам и записываем темплейт в card
      card: similarListFragment.appendChild(adsElement),
      lat: dataTens[i].location.lat,
      lng: dataTens[i].location.lng,
    };
    points[i] = adLabel; //lat, lng, card записываем в элемент массива
  }
  markerGroup = L.layerGroup().addTo(map);
  points.forEach(({lat, lng, card}) => { //для каждого points[i] делаем:
    const icon = L.icon({ //вид иконок
      iconUrl: 'img/pin.svg',
      iconSize: ICON_SIZE_BALUN,
      iconAnchor: ICON_ANCHOR_BALUN,
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
      .addTo(markerGroup)//добавили на карту
      .bindPopup(card);//вставили темплейт для каждой метки
  });
};

export{getBalun, markerGroup};
