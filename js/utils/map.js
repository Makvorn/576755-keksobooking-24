import {MARKER_LAN_LNG, MAP_SIZE, ICON_SIZE_MARKER, ICON_ANCHOR_MARKER, OFFER_PRICE} from './constants.js';
import {showAlert} from './allert-message.js';
import {getDisabledForm} from './off-form.js';
import {getBalun, markerGroup} from './balun-with-server.js';
import {getDebounce} from './debounce.js';
import {getResetInputValue} from './form-work.js';
import {imageInBlock, blockForAvatar} from './load-photo.js';
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
  imageInBlock.scr = '';
  blockForAvatar.src = '';
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
      lat: MARKER_LAN_LNG[0],
      lng: MARKER_LAN_LNG[1],
    }, MAP_SIZE);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  //делаем тип иконки
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: ICON_SIZE_MARKER,
    iconAnchor: ICON_ANCHOR_MARKER,
  });
  //выставляем адрес центральной иконки
  mainPinMarker = L.marker(
    {
      lat: MARKER_LAN_LNG[0], //даем иконке адрес при загрузке страницы
      lng: MARKER_LAN_LNG[1],
    },
    {draggable: true, //говорим что можем ее двигать
      icon: mainPinIcon, //добавляем тип иконки
    },
  );
  mainPinMarker.addTo(map);
  address.value = `${MARKER_LAN_LNG[0]}, ${MARKER_LAN_LNG[1]}`;
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
              case 'middle': return price >= OFFER_PRICE.lowPrice && price <= OFFER_PRICE.highPrice;
              case 'low': return price < OFFER_PRICE.lowPrice;
              case 'high': return price > OFFER_PRICE.highPrice;
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
