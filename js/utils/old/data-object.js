//Не используется

import {getRandomArbitrary, getRandomArrayElement, getRandomValueElement, arrayRandomLengthsValues} from './create-random.js';
//Переменные
let authorAvatar = '';
//данные по объектам из задания
const object = {
  author: {
    avatar: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png', 'img/avatars/user09.png', 'img/avatars/user10.png'],
  },

  offer: {
    title: ['Первый', 'Второй', 'Третий', 'Четвертый', 'Пятый', 'Шестой', 'Седьмой', 'Восьмой', 'Девятый', 'Десятый'],
    address: ['location.lat','location.lng'],
    price: [1000, 5000],
    type: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
    rooms: [1, 30],
    guests: [1, 15],
    checkin: ['12:00', '13:00','14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    description: ['Чисто и уютно', 'Грязно', 'Ужасный ужас', 'Вонючая кровать', 'Большая комната', 'Пыльные шторы', 'Классный дизайн', 'Не стоит своих денег', 'Плохой вид из окна', 'Отличненько'],
    photos: ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'],
  },

  location: {
    lat: [35.65000, 35.70000],
    lng: [139.70000, 139.80000],
  },
};

//создание нового объекта и его тиражирование
const arrayGuests = [];
for (let i = 0; i < 10; i++) {
  const locationLat = Math.round((getRandomArbitrary(object.location.lat[0], object.location.lat[1]))*100000)/100000;
  const locationLng = Math.round((getRandomArbitrary(object.location.lng[0], object.location.lng[1]))*100000)/100000;
  authorAvatar = object.author.avatar[i];
  const guestDetails = {
    author: {avatar: authorAvatar,
    },
    offer: {
      title: getRandomArrayElement(object.offer.title),
      address: `${locationLat  }, ${ locationLng}`,
      price: getRandomValueElement(object.offer.price),
      type: getRandomArrayElement(object.offer.type),
      rooms: getRandomValueElement(object.offer.rooms),
      guests: getRandomValueElement(object.offer.guests),
      checkin: getRandomArrayElement(object.offer.checkin),
      checkout: getRandomArrayElement(object.offer.checkout),
      features: object.offer.features,
      description: getRandomArrayElement(object.offer.description),
      photos: arrayRandomLengthsValues(object.offer.photos),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
  arrayGuests[i] = guestDetails;
}
export {arrayGuests};
