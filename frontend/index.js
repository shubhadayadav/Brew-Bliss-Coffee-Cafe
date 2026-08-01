new Swiper(".menu-scroll", {
    // Optional parameters
    slidesPerView: 3,
    spaceBetween: 30,
    //   loop: true,

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});