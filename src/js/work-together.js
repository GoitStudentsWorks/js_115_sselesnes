const form = document.querySelector('.form');
// const emailInput = form.querySelector('input[type="text"]');
// const messageInput = form.querySelector('textarea');
const emailErrorMsg = document.querySelector('.form-error');
const emailValidMsg = document.querySelector('.email-valid');
const popupOverlay = document.getElementById('popupOverlay');
const popupCloseBtn = document.querySelector('.popup-close');
const popup = document.getElementById('popup');

let isValid = true;

function validateForm() {
  const formData = new FormData(form);
  const email = formData.get('email').trim();

  if (!isValidEmail(email)) {
    emailErrorMsg.style.display = 'block';
    isValid = false;
  } else {
    form.reset();
    openModal();
    emailValidMsg.style.display = 'none';
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function openModal() {
  popupOverlay.classList.remove('visually-hidden');
  popup.classList.remove('visually-hidden');
}

function popupClose() {
  popupOverlay.classList.add('visually-hidden');
  popup.classList.add('visually-hidden');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  validateForm();
});

form.addEventListener('input', function (event) {
  const formData = new FormData(form);
  const email = formData.get('email').trim();

  emailErrorMsg.style.display = 'none';
  emailValidMsg.style.display = 'none';
  if (isValidEmail(email)) {
    emailValidMsg.style.display = 'block';
  }
});

popupCloseBtn.addEventListener('click', popupClose);
