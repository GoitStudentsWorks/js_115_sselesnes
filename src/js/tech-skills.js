const MARQUEE_INNER = document.querySelector(".marquee-inner");
const MARQUEE_INNER_ROTATE = document.querySelector(".marquee-inner-rotate");

function doubleContent(element) {
    const CONTENT = element.innerHTML;
    element.innerHTML += CONTENT;
}

doubleContent(MARQUEE_INNER);
doubleContent(MARQUEE_INNER_ROTATE);