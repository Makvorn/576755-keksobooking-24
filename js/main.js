/* eslint-disable id-length */
/* eslint-disable prefer-template */
/* eslint-disable no-useless-concat */
/* eslint-disable no-unused-vars */
//Функции для положительных целых и с плавающей точкой чисел
const getRandomIntInclusive = (min, max) => {
  min = Math.round(min);
  max = Math.round(max);
  return max > min && min >= 0 ? Math.round(Math.random() * (max - min + 1)) + min : 'Пожалуйста, введите значение не меньше нуля. Также обращаем Ваше внимание что значение "От" не может быть больше значения "До"';
};
const getRandomArbitrary = (min, max) => max > min && min >= 0 ? Math.random() * (max - min) + min : 'Пожалуйста, введите значение не меньше нуля. Также обращаем Ваше внимание что значение "От" не может быть больше значения "До"';

//данные по объектам из задания
const author = {
  avatar: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png', 'img/avatars/user09.png', 'img/avatars/user10.png'],
};

const offer = {
  title: ['Первый', 'Второй', 'Третий', 'Четверный', 'Пятый', 'Шестой', 'Седьмой', 'Восьмой', 'Девятый', 'Десятый'],
  address: ['location.lat','location.lng'],
  price: [],
  type: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
  rooms: [],
  guests: [],
  checkin: ['12:00', '13:00','14:00'],
  checkout: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  description: ['Чисто и уютно', 'Грязно', 'Ужасный ужас', 'Вонючая кровать', 'Большая комната', 'Пыльные шторы', 'Классный дизайн', 'Не стоит своих денег', 'Плохой вид из окна', 'Отличненько'],
  photos: ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'],
};

const location = {
  lat: [35.65000, 35.70000],
  lng: [139.70000, 139.80000],
};
const locationLat = Math.round((getRandomArbitrary(location.lat[0], location.lat[1]))*100000)/100000;
const locationLng = Math.round((getRandomArbitrary(location.lng[0], location.lng[1]))*100000)/100000;

//получение случанных значений из массива
const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length-1)];

//Переменные
const GUEST_LIST_COUNT = 4;
let authorAvatar = '';

//получение случайной длины массива
function arrayRandomLengthsValues(lengthsValues) {
  const lengthOfArray = getRandomIntInclusive(1, lengthsValues.length);
  const array = [];

  while (array.length < lengthOfArray) {
    const indexOfEl = getRandomIntInclusive(0, lengthsValues.length - 1);
    const el = lengthsValues[indexOfEl];

    if (!array.includes(el)) {
      array.push(el);
    }
  }
  return array;
}

//создание нового объекта и его тиражирование
for (let i = 0; i < 10; i++) {
  authorAvatar = author.avatar[i];
  const guestDetails = () => ({
    avatar: authorAvatar,
    title: getRandomArrayElement(offer.title),
    address: 'Широта: ' + locationLat + ', ' + 'долгота: ' + locationLng,
    price: getRandomArrayElement(offer.price),
    type: getRandomArrayElement(offer.type),
    rooms: getRandomArrayElement(offer.rooms),
    guests: getRandomArrayElement(offer.guests),
    checkin: getRandomArrayElement(offer.checkin),
    checkout: getRandomArrayElement(offer.checkout),
    features:  arrayRandomLengthsValues(offer.features),
    description: getRandomArrayElement(offer.description),
    photos: arrayRandomLengthsValues(offer.photos),
  });
}
