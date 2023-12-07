'use strict';

// Helper function to add event listeners on multiple elements
const addEventOnElements = (elements, eventType, callback) => {
    elements.forEach(element => element.addEventListener(eventType, callback));
};

// Helper function to toggle the active state of the navbar
const toggleNavbar = () => {
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('nav-active');
};

// Helper function to hide the header based on scroll position
const hideHeader = () => {
    const isScrollBottom = lastScrollPos < window.scrollY;
    header.classList.toggle('hide', isScrollBottom);
    lastScrollPos = window.scrollY;
};

// Helper function to update the position of the hero slider
const updateSliderPos = () => {
    lastActiveSliderItem.classList.remove('active');
    heroSliderItems[currentSlidePos].classList.add('active');
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

// Helper function to handle the next slide in the hero slider
const slideNext = () => {
    currentSlidePos = (currentSlidePos >= heroSliderItems.length - 1) ? 0 : currentSlidePos + 1;
    updateSliderPos();
};

// Helper function to handle the previous slide in the hero slider
const slidePrev = () => {
    currentSlidePos = (currentSlidePos <= 0) ? heroSliderItems.length - 1 : currentSlidePos - 1;
    updateSliderPos();
};

// Helper function to start auto-sliding and clear interval on mouseover
const handleAutoSlide = () => {
    autoSlideInterval = setInterval(slideNext, 7000);
};

// Helper function to stop auto-slide on mouseover and resume on mouseout
const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
};

// Helper function to apply parallax effect on mousemove
const applyParallaxEffect = event => {
    x = (event.clientX / window.innerWidth) * 10 - 5;
    y = (event.clientY / window.innerHeight) * 10 - 5;
    x = x - x * 2;
    y = y - y * 2;

    parallaxItems.forEach(item => {
        x = x * Number(item.dataset.parallaxSpeed);
        y = y * Number(item.dataset.parallaxSpeed);
        item.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    });
};

// DOM elements
const preloader = document.querySelector('[data-preaload]');
const navbar = document.querySelector('[data-navbar]');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const overlay = document.querySelector('[data-overlay]');
const header = document.querySelector('[data-header]');
const backTopBtn = document.querySelector('[data-back-top-btn]');
const heroSlider = document.querySelector('[data-hero-slider]');
const heroSliderItems = document.querySelectorAll('[data-hero-slider-item]');
const heroSliderPrevBtn = document.querySelector('[data-prev-btn]');
const heroSliderNextBtn = document.querySelector('[data-next-btn]');
const parallaxItems = document.querySelectorAll('[data-parallax-item]');

// Event listeners
window.addEventListener('load', () => {
    preloader.classList.add('loaded');
    document.body.classList.add('loaded');
    handleAutoSlide();
});

addEventOnElements(navTogglers, 'click', toggleNavbar);

window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
        header.classList.add('active');
        backTopBtn.classList.add('active');
        hideHeader();
    } else {
        header.classList.remove('active');
        backTopBtn.classList.remove('active');
    }
});

heroSliderNextBtn.addEventListener('click', slideNext);
heroSliderPrevBtn.addEventListener('click', slidePrev);

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], 'mouseover', stopAutoSlide);
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], 'mouseout', handleAutoSlide);

window.addEventListener('load', handleAutoSlide);

window.addEventListener('mousemove', applyParallaxEffect);
