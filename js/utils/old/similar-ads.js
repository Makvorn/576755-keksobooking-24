//не используются

import {arrayGuests} from './data-object.js';
//темплейт и копируемый блок
const template = document.querySelector('#card')
  .content
  .querySelector('.popup');
//куда вставлять темплейт
const blockMap = document.querySelector('.map__canvas');
//создать фрагмент
const similarListFragment = document.createDocumentFragment();
//сделал десять фрагментов вставки рандомных значений
for (let i = 0; i <= arrayGuests.length - 1; i++) {
//соотнощение русских и английских слов
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

  similarListFragment.appendChild(adsElement);
}
blockMap.appendChild(similarListFragment);

