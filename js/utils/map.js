import {showAlert} from './allert-message.js';
import {getDisabledForm} from './off-form.js';
import {getBalun, markerGroup} from './balun-with-server.js';
import {getDebounce} from './debounce.js';
import {getResetInputValue} from './form-work.js';
//создаем фрагмент документа и ищем селектор поля адреса
const address = document.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');
const typeOnMap = document.querySelector('#housing-type');
const roomsOnMap = document.querySelector('#housing-rooms');
const guestOnMap = document.querySelector('#housing-guests');
const featuresOnMap = document.querySelector('#housing-features');
const checkbox = featuresOnMap.querySelectorAll('.map__checkbox');
const housingPrice = document.querySelector('#housing-price');
const adFormReset = document.querySelector('.ad-form__reset');
let resetBalun;
let map;
let  mainPinMarker;

const getResetInputFilter = () => {
  typeOnMap.value = 'any';
  roomsOnMap.value = 'any';
  guestOnMap.value = 'any';
  housingPrice.value = 'any';
  map.removeLayer(markerGroup);
  for(let i = 0; i <= checkbox.length - 1; i++) {
    checkbox[i].checked = false;
  }
};


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
  mainPinMarker = L.marker(
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
      resetBalun = data;

      mapFilters.addEventListener('change', () => {
        let filterData = data;
        markerGroup.clearLayers();

        const getOfferFeatures = (features) => {
          const featuresArray = Array.from(featuresOnMap.querySelectorAll('.map__checkbox'));
          if (featuresArray.some((feature) => feature.checked)) {
            let isOk = true;
            if (features) {
              for (let i = 0; i < featuresArray.length; i++) {
                if (featuresArray[i].checked && !features.includes(featuresArray[i].value)) {
                  isOk = false;
                  break;
                }
              }
            } else {isOk = false;}
            return isOk;
          }
        };
        const getOfferPrice = (price) => {
          if (housingPrice.value !== 'any') {
            switch (housingPrice.value) {
              case 'middle': return price >= 10000 && price <= 50000;
              case 'low': return price < 10000;
              case 'high': return price > 50000;
            }
          }
        };

        filterData = filterData.filter(({offer}) => (offer.type === typeOnMap.value || typeOnMap.value === 'any') && (offer.rooms === +roomsOnMap.value || roomsOnMap.value === 'any') && (offer.guests === +guestOnMap.value || guestOnMap.value === 'any') && (getOfferPrice(offer.price) || housingPrice.value === 'any') && (getOfferFeatures(offer.features) || getOfferFeatures(offer.features) === undefined));

        const getProcessChange = getDebounce( () => getBalun(filterData));
        getProcessChange();
      });

    })
    .catch (() => {
      showAlert('Ошибка загрузки. Попробуйте обновить страницу');
      getDisabledForm();
    });
  adFormReset.addEventListener('click', () => {
    getResetInputValue();
    getResetInputFilter();
    getBalun(resetBalun);
  });
};
export{map, getMap, mainPinMarker, getResetInputFilter, resetBalun};
