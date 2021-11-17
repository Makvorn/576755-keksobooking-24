const ALERT_SHOW_TIME = 10000;

const showSuccess = () => {
  const showMessage = document.createDocumentFragment();
  const templateSuccess = document.querySelector('#success').content.querySelector('.success');
  const success = templateSuccess.cloneNode(true);
  document.body.append(showMessage.appendChild(success));
  setTimeout(() => {
    success.style.display = 'none';
  }, ALERT_SHOW_TIME);
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      success.style.display = 'none';
    }
  });
};

const showError = () => {
  const showMessage = document.createDocumentFragment();
  const templateError = document.querySelector('#error').content.querySelector('.error');
  const error = templateError.cloneNode(true);
  document.body.append(showMessage.appendChild(error));
  setTimeout(() => {
    error.style.display = 'none';
  }, ALERT_SHOW_TIME);
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      error.style.display = 'none';
    }
  });
  error.addEventListener('click', () => {
    error.style.display = 'none';
  });
};


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;

  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert, showSuccess, showError};
