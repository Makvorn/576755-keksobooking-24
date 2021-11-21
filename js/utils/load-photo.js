const TYPE = ['gif', 'jpg', 'jpeg', 'png'];

const avatar = document.querySelector('#avatar');
const blockForAvatar = document.querySelector('.ad-form-header__preview img');
const lodging = document.querySelector('#images');
const blockForLodging = document.querySelector('.ad-form__photo');
const imageInBlock = document.createElement('img');

const getLoadPhoto = () => {
  avatar.addEventListener('change', () => {
    const file = avatar.files[0];
    const name = file.name.toLowerCase();
    const getFilterTypeFiles = TYPE.some((el) => name.endsWith(el));

    if (getFilterTypeFiles) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        blockForAvatar.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });


  lodging.addEventListener('change', () => {
    const file = lodging.files[0];
    const name = file.name.toLowerCase();
    const getFilterTypeFiles = TYPE.some((el) => name.endsWith(el));

    if (getFilterTypeFiles) {
      const reader = new FileReader();
      imageInBlock.width = '40';
      blockForLodging.append(imageInBlock);
      reader.addEventListener('load', () => {
        imageInBlock.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

export{getLoadPhoto};
