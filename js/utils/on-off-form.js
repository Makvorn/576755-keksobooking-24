//Деактивация формы
const mapFilters = document.querySelector('.map__filters');
const fieldset = document.querySelector('fieldset');
const adForm = document.querySelector('.ad-form');
const getDisabledForm = () => {
  //добавлям класс ad-form--disabled элементам по заданию
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('ad-form--disabled');
  //на fieldset по заданию ставим disabled
  fieldset.setAttribute('disabled', 'disabled');
};


//Активация формы
const getAvailableForm = () => {
  if (getDisabledForm) {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('ad-form--disabled');
    fieldset.setAttribute('disabled', '');
  }
};


export {getDisabledForm, getAvailableForm};
