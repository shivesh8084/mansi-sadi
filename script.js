function openInvitation() {
    const overlay = document.getElementById("welcomeOverlay");
    const music = document.getElementById("bgMusic");
    const icon = document.getElementById("musicIcon");

    if (!overlay) return;

    overlay.classList.add("opened");

    if (music) {
        music.play()
            .then(() => {
                if (icon) {
                    icon.classList.remove("fa-music");
                    icon.classList.add("fa-volume-high");
                }
            })
            .catch(() => {
                console.log("Music requires user interaction.");
            });
    }
}

window.openInvitation = openInvitation;

const weddingDate =
    new Date("November 26, 2026 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minsElement = document.getElementById("mins");
    const secsElement = document.getElementById("secs");

    const weddingMessage =
        document.getElementById("weddingDayMessage");

    if (
        !daysElement ||
        !hoursElement ||
        !minsElement ||
        !secsElement
    ) {
        return;
    }

    if (distance <= 0) {
        daysElement.innerText = "00";
        hoursElement.innerText = "00";
        minsElement.innerText = "00";
        secsElement.innerText = "00";

        if (weddingMessage) {
            weddingMessage.classList.add("show");
        }

        return;
    }

    if (weddingMessage) {
        weddingMessage.classList.remove("show");
    }

    const days =
        Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );

    const mins =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );

    const secs =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );

    daysElement.innerText =
        days.toString().padStart(2, "0");

    hoursElement.innerText =
        hours.toString().padStart(2, "0");

    minsElement.innerText =
        mins.toString().padStart(2, "0");

    secsElement.innerText =
        secs.toString().padStart(2, "0");
}

setInterval(updateCountdown, 1000);

function toggleMusic(event) {
    if (event) {
        event.stopPropagation();
    }

    const music =
        document.getElementById("bgMusic");

    const icon =
        document.getElementById("musicIcon");

    if (!music || !icon) {
        return;
    }

    if (music.paused) {
        music.play()
            .then(() => {
                icon.classList.remove("fa-music");
                icon.classList.add("fa-volume-high");
            })
            .catch(() => {
                console.log("Music play error.");
            });
    } else {
        music.pause();

        icon.classList.remove("fa-volume-high");
        icon.classList.add("fa-music");
    }
}

window.toggleMusic = toggleMusic;

let slideIndex = 0;
let sliderTimer;

function getSlides() {
    return document.querySelectorAll(".slide");
}

function showSlide(index) {
    const slides = getSlides();

    if (!slides.length) {
        return;
    }

    if (index >= slides.length) {
        slideIndex = 0;
    }

    if (index < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    slides[slideIndex].classList.add("active");

    updateSliderDots();
}

function changeSlide(direction) {
    slideIndex += direction;

    showSlide(slideIndex);
    restartSlider();
}

function restartSlider() {
    clearInterval(sliderTimer);

    sliderTimer = setInterval(() => {
        slideIndex++;
        showSlide(slideIndex);
    }, 3500);
}

function createSliderDots() {
    const dotsContainer =
        document.getElementById("sliderDots");

    const slides = getSlides();

    if (!dotsContainer) {
        return;
    }

    dotsContainer.innerHTML = "";

    slides.forEach((slide, index) => {
        const dot =
            document.createElement("span");

        dot.className = "slider-dot";

        dot.onclick = () => {
            slideIndex = index;

            showSlide(slideIndex);
            restartSlider();
        };

        dotsContainer.appendChild(dot);
    });

    updateSliderDots();
}

function updateSliderDots() {
    const dots =
        document.querySelectorAll(".slider-dot");

    dots.forEach(dot => {
        dot.classList.remove("active-dot");
    });

    if (dots[slideIndex]) {
        dots[slideIndex]
            .classList.add("active-dot");
    }
}

window.changeSlide = changeSlide;

const galleryImages = [
    "photo1.jpeg",
    "photo2.jpeg",
    "photo3.jpeg",
    "photo4.jpeg",
    "photo5.jpeg"
];

let galleryIndex = 0;

function openPreWedding() {
    const modal =
        document.getElementById("preWeddingModal");

    if (!modal) {
        return;
    }

    modal.classList.add("active");

    galleryIndex = 0;

    updateGallery();

    document.body.style.overflow = "hidden";
}

function closePreWedding() {
    const modal =
        document.getElementById("preWeddingModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    document.body.style.overflow = "";
}

function updateGallery() {
    const image =
        document.getElementById("galleryMainImage");

    const counter =
        document.getElementById("galleryCounter");

    const thumbnails =
        document.querySelectorAll(".thumb");

    if (!image || !counter) {
        return;
    }

    image.style.opacity = "0";

    setTimeout(() => {
        image.src =
            galleryImages[galleryIndex];

        image.style.opacity = "1";
    }, 120);

    counter.innerText =
        `${galleryIndex + 1} / ${galleryImages.length}`;

    thumbnails.forEach(thumb => {
        thumb.classList.remove("active-thumb");
    });

    if (thumbnails[galleryIndex]) {
        thumbnails[galleryIndex]
            .classList.add("active-thumb");
    }
}

function changeGallery(direction) {
    galleryIndex += direction;

    if (galleryIndex >= galleryImages.length) {
        galleryIndex = 0;
    }

    if (galleryIndex < 0) {
        galleryIndex = galleryImages.length - 1;
    }

    updateGallery();
}

function selectGallery(index) {
    if (
        index < 0 ||
        index >= galleryImages.length
    ) {
        return;
    }

    galleryIndex = index;

    updateGallery();
}

window.openPreWedding = openPreWedding;
window.closePreWedding = closePreWedding;
window.changeGallery = changeGallery;
window.selectGallery = selectGallery;

document.addEventListener("click", function(event) {
    const modal =
        document.getElementById("preWeddingModal");

    if (
        modal &&
        event.target === modal
    ) {
        closePreWedding();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closePreWedding();
    }
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener(
    "DOMContentLoaded",
    function() {
        const galleryViewer =
            document.querySelector(".gallery-viewer");

        if (!galleryViewer) {
            return;
        }

        galleryViewer.addEventListener(
            "touchstart",
            function(event) {
                touchStartX =
                    event.changedTouches[0].screenX;
            },
            {
                passive: true
            }
        );

        galleryViewer.addEventListener(
            "touchend",
            function(event) {
                touchEndX =
                    event.changedTouches[0].screenX;

                handleSwipe();
            },
            {
                passive: true
            }
        );
    }
);

function handleSwipe() {
    const difference =
        touchStartX - touchEndX;

    if (Math.abs(difference) < 40) {
        return;
    }

    if (difference > 0) {
        changeGallery(1);
    } else {
        changeGallery(-1);
    }
}

function sendToWhatsApp(event) {
    event.preventDefault();

    const name =
        document
            .getElementById("wishName")
            .value
            .trim();

    const phone =
        document
            .getElementById("wishPhone")
            .value
            .trim();

    const message =
        document
            .getElementById("wishMessage")
            .value
            .trim();

    const targetNumber =
        "918084296708";

    const whatsappMessage =
`💐 Wedding Blessings 💐

Name: ${name}

WhatsApp No.: ${phone}

Wish:
${message}

Mansi ❤️ Dr. Nishu
26th November 2026`;

    const whatsappUrl =
        `https://wa.me/${targetNumber}?text=` +
        encodeURIComponent(whatsappMessage);

    window.open(
        whatsappUrl,
        "_blank"
    );
}

window.sendToWhatsApp = sendToWhatsApp;


/* ==========================================
   YOUTUBE CHANNEL URL
   Yahan baad me apna YouTube channel URL dalna hai.
   Example:
   const WEDDING_CHANNEL_URL = "https://www.youtube.com/@YourChannel";
========================================== */

const WEDDING_CHANNEL_URL =
    "YOUR_YOUTUBE_CHANNEL_URL_HERE";


document.addEventListener(
    "DOMContentLoaded",
    function() {

        const youtubeButton =
            document.getElementById(
                "youtubeChannelButton"
            );

        if (
            youtubeButton &&
            WEDDING_CHANNEL_URL !==
            "YOUR_YOUTUBE_CHANNEL_URL_HERE"
        ) {
            youtubeButton.href =
                WEDDING_CHANNEL_URL;
        }

        createSliderDots();
        showSlide(0);
        restartSlider();

        updateGallery();
        updateCountdown();
    }
);
