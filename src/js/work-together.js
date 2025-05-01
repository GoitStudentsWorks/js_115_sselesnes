const form = document.querySelector('.form');
// const emailInput = form.querySelector('input[type="text"]');
// const messageInput = form.querySelector('textarea');
const emailErrorMsg = document.querySelector('.form-error');
const emailValidMsg = document.querySelector('.email-valid');
const popupOverlay = document.getElementById('popupOverlay');
const popupCloseBtn = document.querySelector('.popup-close');
const popup = document.getElementById('popup');

let isValid = true;
let scrollbarWidth = 0;

function validateForm() {
  const formData = new FormData(form);
  const email = formData.get('email').trim();

  if (!isValidEmail(email)) {
    emailErrorMsg.style.display = 'block';
    isValid = false;
  } else {
    openModal();
    emailValidMsg.style.display = 'none';
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// turn off the vertical scrollbar so body doesn't moving by offset
function openModal() {
  if (!scrollbarWidth) {
    scrollbarWidth = getScrollbarWidth();
  }

  popupOverlay.classList.remove('visually-hidden');
  popup.classList.remove('visually-hidden');

  document.body.style.paddingRight = `${scrollbarWidth}px`;
  document.body.style.transition = 'none';
  document.body.style.overflow = 'hidden';

  popupOverlay.addEventListener('click', handleOverlayClick);
}

function handleOverlayClick() {
  popupClose();
}

function popupClose() {
  form.reset();
  popupOverlay.classList.add('visually-hidden');
  popup.classList.add('visually-hidden');

  document.body.style.paddingRight = '';
  document.body.style.overflow = '';
  popupOverlay.removeEventListener('click', handleOverlayClick);
  // document.body.style.transition = 'all 0.3s ease';git
}

function getScrollbarWidth() {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.width = '100px';
  outer.style.height = '100px';
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  inner.style.width = '100%';
  inner.style.height = '100%';
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  document.body.removeChild(outer);
  return scrollbarWidth;
}

function formSubmitHandle(event) {
  event.preventDefault();
  validateForm();
}

function formInputHandle(event) {
  const formData = new FormData(form);
  const email = formData.get('email').trim();

  emailErrorMsg.style.display = 'none';
  emailValidMsg.style.display = 'none';
  if (isValidEmail(email)) {
    emailValidMsg.style.display = 'block';
  }
}

form.addEventListener('submit', formSubmitHandle);
form.addEventListener('input', formInputHandle);
popupCloseBtn.addEventListener('click', popupClose);
