const form = document.querySelector('.form');
const emailInput = form.querySelector('input[type="text"]');
const messageInput = form.querySelector('textarea');
const emailErrorMsg = document.querySelector('.form-error');
const emailValidMsg = document.querySelector('.email-valid');
const popupOverlay = document.getElementById('popupOverlay');
const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.popup-close');
let isValid = true;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  validateForm();
});

form.addEventListener('input', function (event) {
  emailErrorMsg.style.display = 'none';
  emailValidMsg.style.display = 'none';
  if (isValidEmail(emailInput.value.trim())) {
    emailValidMsg.style.display = 'block';
  }
});

function validateForm() {
  if (!isValidEmail(emailInput.value.trim())) {
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

const closeModalButton = document.querySelector('.popup-close');
if (closeModalButton) {
  closeModalButton.addEventListener('click', () => {
    popupOverlay.classList.add('visually-hidden');
    popup.classList.add('visually-hidden');
  });
}
