import {showAlert} from './allert-message.js';
import {getDisabledForm} from './off-form.js';
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
        let filterData = data;
        markerGroup.clearLayers();

        const featuresArray = Array.from(featuresOnMap.querySelectorAll('.map__checkbox'));
        if (featuresArray.some((feature) => feature.checked)) {
          filterData = filterData.filter(({offer}) => {
            let isOk = true;
            if (offer.features) {
              for (let i = 0; i < featuresArray.length; i++) {
                if (featuresArray[i].checked && !offer.features.includes(featuresArray[i].value)) {
                  isOk = false;
                  break;
                }
              }
            } else {isOk = false;}
            return isOk;
          });
        }

        if (typeOnMap.value !== 'any') {
          filterData = filterData.filter(({offer}) => offer.type === typeOnMap.value);
        }
        if (roomsOnMap.value !== 'any') {
          filterData = filterData.filter(({offer}) => offer.rooms === +roomsOnMap.value);
        }
        if (guestOnMap.value !== 'any') {
          filterData = filterData.filter(({offer}) => offer.guests === +guestOnMap.value);
        }
        if (housingPrice.value !== 'any') {
          filterData = filterData.filter(({offer}) => {
            switch (housingPrice.value) {
              case 'middle': return offer.price >= 10000 && offer.price <= 50000;
              case 'low': return offer.price < 10000;
              case 'high': return offer.price > 50000;
            }
          });
        }

        const getProcessChange = getDebounce( () => getBalun(filterData));
        getProcessChange();
      });

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
