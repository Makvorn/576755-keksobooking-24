const adFormHeaderPreview = document.querySelector('.ad-form-header__preview');
const photoAvatar = adFormHeaderPreview.querySelectorAll('img');
const adFormField = document.querySelector('.ad-form__field');
const input =
adFormField.addEventListener('submit', (evt) => {
  photoAvatar.setAttribute('src', '')
});
