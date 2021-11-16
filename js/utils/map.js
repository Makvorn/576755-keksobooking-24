import {showAlert} from './allert-message.js';
import {getDisabledForm, getAvailableForm} from './on-off-form.js';
import {getBalun, markerGroup} from './balun-with-server.js';
import {getDebounce} from './debounce.js';
//создаем фрагмент документа и ищем селектор поля адреса
const address = document.querySelector('#address');
const adFormReset = document.querySelector('.ad-form__reset');
//НАчал делать для отдельного модуля
const mapFilters = document.querySelector('.map__filters');
const typeOnMap = document.querySelector('#housing-type');
const roomsOnMap = document.querySelector('#housing-rooms');
const guestOnMap = document.querySelector('#housing-guests');
const featuresOnMap = document.querySelector('#housing-features');
const housingPrice = document.querySelector('#housing-price');
//блочим заполнение формы до загрузки карты
let map;
const getMap = () => {
//грузим карту
  map = L.map('map-canvas')
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
  address.value = '35.681729, 139.753927';
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
      getBalun(data);
      mapFilters.addEventListener('change', () => {
        map.closePopup();
        let price;
        switch (housingPrice.value) {
          case 'middle':  10000 <= price < 50000;
            break;
          case 'low': price < 10000;
            break;
          case 'high': price >= 50000;
            break;
        }
        //ну пашок
        /*        if(!typeOnMap.value === 'any') {
          arrayData = arrayData.filter(({offer}) => offer.type === typeOnMap.value);
        }
        console.log(arrayData);
        if(!roomsOnMap.value === 'any') {
          arrayData = arrayData.filter(({offer}) => offer.rooms === +roomsOnMap.value);
        }
        if (!guestOnMap.value === 'any') {
          arrayData = arrayData.filter(({offer}) => offer.guests === +guestOnMap.value);
        }*/
        // нужно фьючерсы сортировать  || offer.price === price
        markerGroup.clearLayers();
        const filterDataFeatures = data.filter(({offer}) => offer.features);
        const filterData = data.filter(({offer}) => offer.type === typeOnMap.value || offer.rooms === +roomsOnMap.value || offer.guests === +guestOnMap.value);
        console.log(filterData);
        const getProcessChange = getDebounce( () => getBalun(filterData));
        getProcessChange();
      });
      getAvailableForm();
    })
    .catch (() => {
      showAlert('Ошибка загрузки. Попробуйте обновить страницу');
      getDisabledForm();
    });

  adFormReset.addEventListener('click', () => {
    map.closePopup();
  });
//разблочим карту после прогрузки
};
export{map, getMap};
