const SKILLS = [
    'HTML/CSS',
    'JavaScript',
    'React',
    'Node. js',
    'React Native',
    'Typescript'
]

const MARQUEE_INNER = document.querySelector(".marquee-inner");
const MARQUEE_INNER_ROTATE = document.querySelector(".marquee-inner-rotate");

function createMarkup(array) {
    return array.map((item) => `
    <span class="marquee-line">${item}</span>
    <span class="marquee-dot"></span>
    `).join("");
}

function createMarkupRotate(array) {
    return array.map((item) => `
    <span class="marquee-line-rotate">${item}</span>
    <span class="marquee-dot-rotate"></span>
    `).join("");
}

MARQUEE_INNER.insertAdjacentHTML("beforeend", createMarkup(SKILLS));
MARQUEE_INNER_ROTATE.insertAdjacentHTML("beforeend", createMarkupRotate(SKILLS));

function doubleContent(element) {
    if (!element) return;
    const content = element.innerHTML;
    element.innerHTML +=content;
}

doubleContent(MARQUEE_INNER);
doubleContent(MARQUEE_INNER_ROTATE);

function toggleAnimation() {
    this.classList.toggle("paused")
}

MARQUEE_INNER.addEventListener("click", toggleAnimation);
MARQUEE_INNER_ROTATE.addEventListener("click", toggleAnimation);