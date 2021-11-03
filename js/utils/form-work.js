const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const fieldset = document.querySelector('fieldset');
const buttonPublisher = document.querySelector('.ad-form__submit');
const numberRooms = document.getElementById('room_number');
const optionRoom = numberRooms.querySelectorAll('option');
const numberGuests = document.getElementById('capacity');
const optionGuest = numberGuests.querySelectorAll('option');
const getCount = document.getElementById('price');
const type = document.getElementById('type');
const timeIn = document.getElementById('timein');
const timeOut = document.getElementById('timeout');


//Блокируем кнопку выбора количества гостей до выбора комнат
numberGuests.setAttribute('disabled', 'disabled');
//Количество гостей меняется взависимости от выбора количества компнат;
numberRooms.addEventListener('change', (event) => {
  switch (event.target.value) {
    case 'select-room':
      numberGuests.value = 'select-capacity';
      break;
    case '1':
      numberGuests.value = 1;
      optionGuest[0].setAttribute('disabled', 'disabled');
      optionGuest[1].setAttribute('disabled', 'disabled');
      optionGuest[2].setAttribute('disabled', 'disabled');
      optionGuest[4].setAttribute('disabled', 'disabled');
      break;
    case '2':
      numberGuests.value = 2;
      optionGuest[3].removeAttribute('disabled');
      optionGuest[2].removeAttribute('disabled');
      optionGuest[0].setAttribute('disabled', 'disabled');
      optionGuest[1].setAttribute('disabled', 'disabled');
      optionGuest[4].setAttribute('disabled', 'disabled');
      break;
    case '3':
      numberGuests.value = 3;
      optionGuest[1].removeAttribute('disabled');
      optionGuest[2].removeAttribute('disabled');
      optionGuest[3].removeAttribute('disabled');
      optionGuest[0].setAttribute('disabled', 'disabled');
      optionGuest[4].setAttribute('disabled', 'disabled');
      break;
    case '100':
      numberGuests.value = 0;
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
timeIn.addEventListener('change', (event) => {
  switch (event.target.value) {
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

timeOut.addEventListener('change', (event) => {
  switch (event.target.value) {
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
type.addEventListener('change', (event) => {
  switch (event.target.value) {
    case 'bungalow':
      getCount.min = 0;
      getCount.value = 0;
      break;
    case 'flat':
      getCount.min = 1000;
      getCount.value = 1000;
      break;
    case 'hotel':
      getCount.min = 3000;
      getCount.value = 3000;
      break;
    case 'house':
      getCount.min = 5000;
      getCount.value = 5000;
      break;
    case 'palace':
      getCount.min = 10000;
      getCount.value = 10000;
      break;
    case 'select-type':
      getCount.min = 0;
      getCount.value = 0;
      break;
  }
});
//Деактивация формы
const getDisabledForm = () => {
//добавлям класс ad-form--disabled элементам по заданию
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('ad-form--disabled');
  //на fieldset по заданию ставим disabled
  fieldset.setAttribute('disabled', 'disabled');
};
getDisabledForm();

//Активация формы
const getAvailableForm = () => {
  if (getDisabledForm) {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('ad-form--disabled');
    fieldset.setAttribute('disabled', '');
  }
};
getAvailableForm();

//Не даем отправить форму до заполнения необходимых данных
adForm.addEventListener('change', () => {
  numberRooms.value === 'select-room' || type.value === 'select-type' ? buttonPublisher.setAttribute('disabled', 'disabled') : buttonPublisher.removeAttribute('disabled');
});
