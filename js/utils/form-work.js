import {MARKER_LAN_LNG, TITLEADS_MIN_LENGTH, TITLEADS_MAX_LENGTH, NUMBER_GUESTS_VALUE, COUNT_MIN_PLACEHOLDER} from './constants.js';
import {showSuccess, showError, showAlert} from './allert-message.js';
import {map, mainPinMarker, getResetInputFilter, resetBalun} from './map.js';
import {getBalun} from './balun-with-server.js';
const adForm = document.querySelector('.ad-form');
const buttonPublisher = document.querySelector('.ad-form__submit');
const numberRooms = document.querySelector('#room_number');
const optionRoom = numberRooms.querySelectorAll('option');
const numberGuests = document.querySelector('#capacity');
const optionGuest = numberGuests.querySelectorAll('option');
const count = document.querySelector('#price');
const type = document.querySelector('#type');
const optionType = type.querySelectorAll('option');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const titleAds = document.querySelector('#title');
const address = document.querySelector('#address');
const checkbox = document.querySelectorAll('.features__checkbox');
const feildComment = document.querySelector('#description');

const getResetInputValue = () => {
  type.value = optionType[0].value;
  count.value = '';
  timeIn.value = '12:00';
  timeOut.value = '12:00';
  numberRooms.value = optionRoom[0].value;
  numberGuests.value = optionGuest[0].value;
  optionGuest.value = 'select-capacity';
  titleAds.value = '';
  address.value = `${MARKER_LAN_LNG[0]}, ${MARKER_LAN_LNG[1]}`;
  feildComment.value = '';
  type.style.border = '1px solid #d9d9d3';
  count.style.border = '1px solid #d9d9d3';
  numberRooms.style.border = '1px solid #d9d9d3';
  titleAds.style.border = '1px solid #d9d9d3';
  map.closePopup();
  mainPinMarker.setLatLng(MARKER_LAN_LNG).update();
  for(let i = 0; i <= checkbox.length - 1; i++) {
    checkbox[i].checked = false;
  }
};

const getMessageErrorInput = () => {
  type.value === optionType[0].value ? type.style.border = '3px solid red' : type.style.border = 'none';
  count.value < +count.placeholder || count.value > +count.max || count.value === '' ? count.style.border = '3px solid red' : count.style.border = 'none';
  numberRooms.value === optionRoom[0].value ? numberRooms.style.border = '3px solid red' : numberRooms.style.border = 'none';
  titleAds.value.length < TITLEADS_MIN_LENGTH || titleAds.value.length > TITLEADS_MAX_LENGTH ? titleAds.style.border = '3px solid red' : titleAds.style.border = 'none';
  showAlert('Пожалуйста, заполните необходимые поля');
};

const getForm = () => {
  //Блокируем кнопку выбора количества гостей до выбора комнат
  numberGuests.setAttribute('disabled', 'disabled');
  //Количество гостей меняется взависимости от выбора количества компнат;
  numberRooms.addEventListener('change', (evt) => {
    switch (evt.target.value) {
      case 'select-room':
        numberGuests.value = 'select-capacity';
        break;
      case '1':
        numberGuests.value = NUMBER_GUESTS_VALUE[1];
        optionGuest[0].setAttribute('disabled', 'disabled');
        optionGuest[1].setAttribute('disabled', 'disabled');
        optionGuest[2].setAttribute('disabled', 'disabled');
        optionGuest[4].setAttribute('disabled', 'disabled');
        break;
      case '2':
        numberGuests.value = NUMBER_GUESTS_VALUE[2];
        optionGuest[3].removeAttribute('disabled');
        optionGuest[2].removeAttribute('disabled');
        optionGuest[0].setAttribute('disabled', 'disabled');
        optionGuest[1].setAttribute('disabled', 'disabled');
        optionGuest[4].setAttribute('disabled', 'disabled');
        break;
      case '3':
        numberGuests.value = NUMBER_GUESTS_VALUE[3];
        optionGuest[1].removeAttribute('disabled');
        optionGuest[2].removeAttribute('disabled');
        optionGuest[3].removeAttribute('disabled');
        optionGuest[0].setAttribute('disabled', 'disabled');
        optionGuest[4].setAttribute('disabled', 'disabled');
        break;
      case '100':
        numberGuests.value = NUMBER_GUESTS_VALUE[0];
        optionGuest[4].removeAttribute('disabled');
        optionGuest[0].setAttribute('disabled', 'disabled');
        optionGuest[1].setAttribute('disabled', 'disabled');
        optionGuest[2].setAttribute('disabled', 'disabled');
        optionGuest[3].setAttribute('disabled', 'disabled');
        break;
    }
    //Блокируем кнопку выбора гостей если пользователь вернулся к "выбору значения"
    numberRooms.value === optionRoom[0].value ? numberGuests.setAttribute('disabled', 'disabled') : numberGuests.removeAttribute('disabled');
  });

  //проверка времени заезда и выезда
  timeIn.addEventListener('change', (evt) => {
    switch (evt.target.value) {
      case '12:00':
        timeOut.value = '12:00';
        break;
      case '13:00':
        timeOut.value = '13:00';
        break;
      case '14:00':
        timeOut.value = '14:00';
        break;
    }
  });

  timeOut.addEventListener('change', (evt) => {
    switch (evt.target.value) {
      case '12:00':
        timeIn.value = '12:00';
        break;
      case '13:00':
        timeIn.value = '13:00';
        break;
      case '14:00':
        timeIn.value = '14:00';
        break;
    }
  });

  //установка минимальной стоимости жилья
  type.addEventListener('change', (evt) => {
    switch (evt.target.value) {
      case 'bungalow':
        count.min = COUNT_MIN_PLACEHOLDER.bungalow;
        count.placeholder = COUNT_MIN_PLACEHOLDER.bungalow;
        break;
      case 'flat':
        count.min = COUNT_MIN_PLACEHOLDER.flat;
        count.placeholder = COUNT_MIN_PLACEHOLDER.flat;
        break;
      case 'hotel':
        count.min = COUNT_MIN_PLACEHOLDER.hotel;
        count.placeholder = COUNT_MIN_PLACEHOLDER.hotel;
        break;
      case 'house':
        count.min = COUNT_MIN_PLACEHOLDER.house;
        count.placeholder = COUNT_MIN_PLACEHOLDER.house;
        break;
      case 'palace':
        count.min = COUNT_MIN_PLACEHOLDER.palace;
        count.placeholder = COUNT_MIN_PLACEHOLDER.palace;
        break;
      case 'select-type':
        count.min = COUNT_MIN_PLACEHOLDER.select;
        count.placeholder = COUNT_MIN_PLACEHOLDER.select;
        break;
    }
  });

  buttonPublisher.addEventListener('click', () => {
    getMessageErrorInput();
  });

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    fetch('https://24.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: new FormData(evt.target),
      },
    )
      .then((response) => {
        if (response.ok) {
          showSuccess();
          getResetInputValue();
          getResetInputFilter();
          getBalun(resetBalun);
        } else {
          showError();
          getMessageErrorInput();
        }
      })
      .catch(() => {
        showError();
        getMessageErrorInput;
      });
  });

};

export {getForm, getResetInputValue};

