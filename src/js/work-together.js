const form = document.querySelector('.form');
const emailErrorMsg = document.querySelector('.form-error');
const emailValidMsg = document.querySelector('.email-valid');
const popupOverlay = document.getElementById('popupOverlay');
const popupCloseBtn = document.querySelector('.popup-close');
const popup = document.getElementById('popup');

let isValid = true;
let isMessageSent = false;
let scrollbarWidth = 0;

function validateForm() {
  const formData = new FormData(form);
  const email = formData.get('email').trim();
  const message = formData.get('message').trim();

  if (!isValidEmail(email)) {
    emailErrorMsg.style.display = 'block';
    isValid = false;
  } else {
    sendFeedback(email, message);
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
  document.addEventListener('keydown', handleOverlayClick);
}

function handleOverlayClick(event) {
  if (event.type == 'click' || event.key == 'Escape') {
    popupClose();
  }
}

function popupClose() {
  isMessageSent && form.reset();
  popupOverlay.classList.add('visually-hidden');
  popup.classList.add('visually-hidden');

  document.body.style.paddingRight = '';
  document.body.style.overflow = '';
  popupOverlay.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleOverlayClick);
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

function formInputHandle() {
  const formData = new FormData(form);
  const email = formData.get('email').trim();

  emailErrorMsg.style.display = 'none';
  emailValidMsg.style.display = 'none';
  if (isValidEmail(email)) {
    emailValidMsg.style.display = 'block';
  }
}

async function sendFeedback(email, message) {
  const apiUrl = 'https://portfolio-js.b.goit.study/api/requests';
  const dataToSend = { email: email, comment: message };
  const popupTitle = popup.querySelector('.popup-title');
  const popupText = popup.querySelector('.popup-text');
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! ${response.status}`);
    }

    const responseData = await response.json();
    if (responseData && responseData.title && responseData.message) {
      popupTitle.textContent = responseData.title;
      popupText.textContent = responseData.message;
      isMessageSent = true;
    } else {
      console.error('server response error', error);
    }
  } catch (error) {
    console.error('request send error', error);
  }
}

form.addEventListener('submit', formSubmitHandle);
form.addEventListener('input', formInputHandle);
popupCloseBtn.addEventListener('click', popupClose);
