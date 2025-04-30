import Swiper from 'swiper';
import 'swiper/css';

const REVIEWS_LIST = document.querySelector('.reviews-list');
const REVIEWS_BTN_LEFT = document.querySelector('.reviews-btn-left').closest('button');
const REVIEWS_BTN_RIGHT = document.querySelector('.reviews-btn-right').closest('button');

const API_URL = '';
let swiper;
let reviewsData;

async function fetchReviews() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status:${response.status}`);
        }
        reviewsData = await response.json();
        if (!reviewsData.length) {
            throw new Error("No reviews");
            
        }
            renderRewiews(reviewsData);
            initSwiper()
        
    } catch (error) {
        console.error('Failed to load reviews: ' + error.message);
        renderNotFound();
    }
}

function renderRewiews(reviews) {
    REVIEWS_LIST.innerHTML = reviews.map(review => `
        <li class="reviews-list-item swiper-slide">
        <p class="reviews-list-item-text">${review.text}</p>
        <div class="reviews-list-item-author">
        <picture>
        <source srcset="${review.image1x} 1x, ${review.image2x} 2x" type="image/webp"/>
        <img 
            class="reviews-list-item-img"
            src="${review.image2x}"
            alt="${review.author}"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"/>
        </picture>
        <h4 class="reviews-list-item-name">${review.author}</h4>
        </div>
        </li>
        `).join('');

    
}

function renderNotFound() {
    REVIEWS_LIST.innerHTML = '<li class = "reviews-not-found">Not found reviews</li>';
}

function initSwiper() {
    swiper = new Swiper('.reviews-list', {
        slidesPerView: 1,
        spaceBetween: 32,
        breakpoints: {
            1280: {
                slidesPerView: 2,
            }
        },
        keyboard: {
            enabled: true,
        },
            on: {
                init(swiper) {
                    updateButtonState(swiper);

                },
                slideChange(swiper) {
                    updateButtonState(swiper);

                }
            },
        }
    
    )

REVIEWS_BTN_LEFT.addEventListener('click', () => {
    swiper.slidePrev();
})

REVIEWS_BTN_RIGHT.addEventListener('click', () => {
    swiper.slideNext();
})

}

function updateButtonState(swiper) {

    swiper.isBeginning ? disableButton(REVIEWS_BTN_LEFT) : enableButton(REVIEWS_BTN_LEFT);

    swiper.isEnd ? disableButton(REVIEWS_BTN_RIGHT) : enableButton(REVIEWS_BTN_RIGHT);
    
}

function enableButton(btn) {
    btn.disabled = false;
    btn.classList.remove('disabled');  
}

function disableButton(btn) {
    btn.disabled = true;
    btn.classList.add('disabled');    
}

fetchReviews();
