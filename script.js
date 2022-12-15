const nav = document.querySelector(".primary-navigation");
const toggleBtn = document.querySelector(".mobile-nav-toggle");
const overlay = document.querySelector(".overlay");
const html = document.querySelector("html");
const body = document.querySelector("body");
const cartBtn = document.querySelector(".cart-btn");
const cart = document.querySelector(".cart");
const cartBody = document.querySelectorAll(".cart-body");
const cartValue = document.querySelector(".cart-value");
const cartPlus = document.querySelector(".cart-plus");
const cartMinus = document.querySelector(".cart-minus");
const cartBadge = document.querySelector(".cart-badge");
const cartItems = document.querySelector(".items-in-cart");
const addToCart = document.querySelector(".btn");
const totalCartCost = document.querySelector(".total-cart-cost");
const heroImg = document.querySelector(".hero-img");
const thumbnails = document.querySelectorAll(".thumbnail");
const thumbnailImgs = document.querySelectorAll(".thumbnail>img");
const nextHeroImgBtn = document.querySelector(".next-hero-img-btn");
const prevHeroImgBtn = document.querySelector(".prev-hero-img-btn");
const lightbox = document.querySelector(".lightbox");
const lightboxHeroImg = document.querySelector(".lightbox-hero-img");
const lightboxNextHeroImgBtn = document.querySelector(".lightbox-next-hero-img-btn");
const lightboxPrevHeroImgBtn = document.querySelector(".lightbox-prev-hero-img-btn");
const lightboxThumbnails = document.querySelectorAll(".lightbox-thumbnail");
const lightboxCloseBtn = document.querySelector(".lightbox-close");

// let currentHeroImg = 1;
const price = 125;
let currentHeroImg = 1;
let itemsInCart = 0;
cartValue.innerHTML = itemsInCart;

toggleBtn.addEventListener("click", (e) => {
    const navVisibile = nav.getAttribute("data-visible") === "true";
    if (navVisibile) {
        nav.setAttribute("data-visible", "false");
        toggleBtn.setAttribute("aria-expanded", "false");
        overlay.setAttribute("aria-expanded", "false");
        html.classList.remove("dont-scroll");
        body.classList.remove("dont-scroll");
    } else {
        nav.setAttribute("data-visible", "true");
        toggleBtn.setAttribute("aria-expanded", "true");
        overlay.setAttribute("aria-expanded", "true");
        html.classList.add("dont-scroll");
        body.classList.add("dont-scroll");
    }
});

overlay.addEventListener("click", (e) => {
    nav.setAttribute("data-visible", "false");
    toggleBtn.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-expanded", "false");
});

cartBtn.addEventListener("click", (e) => {
    const cartVisible = cart.getAttribute("data-visible") === "true";
    if (itemsInCart === 0) {
        cartBody[0].classList.add("active");
        cartBody[1].classList.remove("active");
    } else {
        cartBody[0].classList.remove("active");
        cartBody[1].classList.add("active");
    }

    if (cartVisible) {
        cart.setAttribute("data-visible", "false");
    } else {
        cart.setAttribute("data-visible", "true");
    }
});

cartPlus.addEventListener("click", () => {
    itemsInCart++;
    if (itemsInCart > 0) {
        cartBadge.classList.remove("hide");
    }
    cartValue.innerHTML = itemsInCart;
    cartBadge.innerHTML = itemsInCart;
});

cartMinus.addEventListener("click", () => {
    itemsInCart--;
    if (itemsInCart <= 0) {
        itemsInCart = 0;
        cartBadge.classList.add("hide");
    }
    cartValue.innerHTML = itemsInCart;
    cartBadge.innerHTML = itemsInCart;
});

addToCart.addEventListener("click", () => {
    cartItems.innerHTML = itemsInCart;
    totalCartCost.innerHTML = itemsInCart * price;
});

thumbnailImgs.forEach((thumbnail, idx) => {
    thumbnail.addEventListener("click", (e) => {
        currentHeroImg = idx + 1;
        heroImg.src = `./images/image-product-${idx + 1}.jpg`;
        updateThumbnail(idx);
    });
});

nextHeroImgBtn.addEventListener("click", (e) => {
    if (currentHeroImg === 4) {
        currentHeroImg = 1;
        heroImg.src = `./images/image-product-${currentHeroImg}.jpg`;
        return;
    }
    currentHeroImg++;
    heroImg.src = `./images/image-product-${currentHeroImg}.jpg`;
});

prevHeroImgBtn.addEventListener("click", (e) => {
    if (currentHeroImg === 1) {
        currentHeroImg = 4;
        heroImg.src = `./images/image-product-${currentHeroImg}.jpg`;
        return;
    }
    currentHeroImg--;
    heroImg.src = `./images/image-product-${currentHeroImg}.jpg`;
});

heroImg.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxHeroImg.src = heroImg.src;
    lightboxThumbnails.forEach((i) => {
        i.classList.contains("active") && i.classList.remove("active");
    });
    lightboxThumbnails[currentHeroImg - 1].classList.add("active");
});

lightboxNextHeroImgBtn.addEventListener("click", (e) => {
    if (currentHeroImg === 4) {
        currentHeroImg = 1;
        lightboxHeroImg.src = `./images/image-product-${currentHeroImg}.jpg`;
        updateLightboxThumbnail();
        return;
    }
    currentHeroImg++;
    lightboxHeroImg.src = `./images/image-product-${currentHeroImg}.jpg`;
    updateLightboxThumbnail();
});

lightboxPrevHeroImgBtn.addEventListener("click", (e) => {
    if (currentHeroImg === 1) {
        currentHeroImg = 4;
        lightboxHeroImg.src = `./images/image-product-${currentHeroImg}.jpg`;
        updateLightboxThumbnail();
        return;
    }
    currentHeroImg--;
    lightboxHeroImg.src = `./images/image-product-${currentHeroImg}.jpg`;
    updateLightboxThumbnail();
});

lightboxCloseBtn.addEventListener("click", (e) => {
    lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
    if (e.target !== e.currentTarget) {
        return;
    }
    lightbox.classList.remove("active");
});

function updateLightboxThumbnail() {
    lightboxThumbnails.forEach((lightboxThumbnail) => {
        lightboxThumbnail.classList.contains("active") && lightboxThumbnail.classList.remove("active");
    });
    lightboxThumbnails[currentHeroImg - 1].classList.add("active");
}

function updateThumbnail(index) {
    thumbnails.forEach((thumbnail) => {
        thumbnail.classList.contains("active") && thumbnail.classList.remove("active");
    });
    thumbnails[index].classList.add("active");
}
