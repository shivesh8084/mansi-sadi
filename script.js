/* ==========================================
   MANSI & DR. NISHU
   WEDDING INVITATION
   COMPLETE JAVASCRIPT
========================================== */


/* ==========================================
   TAP TO OPEN
========================================== */

function openInvitation(event) {

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const overlay =
        document.getElementById(
            "welcomeOverlay"
        );

    const music =
        document.getElementById(
            "bgMusic"
        );

    const icon =
        document.getElementById(
            "musicIcon"
        );


    if (overlay) {

        overlay.classList.add(
            "opened"
        );

        overlay.style.opacity = "0";

        overlay.style.visibility =
            "hidden";

        overlay.style.pointerEvents =
            "none";

    }


    if (music) {

        music.volume = 0.45;

        const playPromise =
            music.play();


        if (
            playPromise !== undefined
        ) {

            playPromise
                .then(function () {

                    if (icon) {

                        icon.classList.remove(
                            "fa-music"
                        );

                        icon.classList.add(
                            "fa-volume-high"
                        );

                    }

                })
                .catch(function () {

                    console.log(
                        "Music autoplay blocked by browser."
                    );

                });

        }

    }

}


window.openInvitation =
    openInvitation;



/* ==========================================
   MUSIC TOGGLE
========================================== */

function toggleMusic(event) {

    if (event) {

        event.preventDefault();

        event.stopPropagation();

    }


    const music =
        document.getElementById(
            "bgMusic"
        );


    const icon =
        document.getElementById(
            "musicIcon"
        );


    if (!music || !icon) {

        return;

    }


    if (music.paused) {

        music.volume = 0.45;

        const playPromise =
            music.play();


        if (
            playPromise !== undefined
        ) {

            playPromise
                .then(function () {

                    icon.classList.remove(
                        "fa-music"
                    );

                    icon.classList.add(
                        "fa-volume-high"
                    );

                })
                .catch(function () {

                    console.log(
                        "Music play blocked."
                    );

                });

        }

    } else {

        music.pause();


        icon.classList.remove(
            "fa-volume-high"
        );

        icon.classList.add(
            "fa-music"
        );

    }

}


window.toggleMusic =
    toggleMusic;



/* ==========================================
   COUNTDOWN
========================================== */

const weddingDate =
    new Date(
        "November 26, 2026 00:00:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();


    const distance =
        weddingDate - now;


    const daysElement =
        document.getElementById(
            "days"
        );


    const hoursElement =
        document.getElementById(
            "hours"
        );


    const minsElement =
        document.getElementById(
            "mins"
        );


    const secsElement =
        document.getElementById(
            "secs"
        );


    const weddingMessage =
        document.getElementById(
            "weddingDayMessage"
        );


    if (
        !daysElement ||
        !hoursElement ||
        !minsElement ||
        !secsElement
    ) {

        return;

    }


    if (distance <= 0) {

        daysElement.innerText =
            "00";

        hoursElement.innerText =
            "00";

        minsElement.innerText =
            "00";

        secsElement.innerText =
            "00";


        if (weddingMessage) {

            weddingMessage.classList.add(
                "show"
            );

        }

        return;

    }


    if (weddingMessage) {

        weddingMessage.classList.remove(
            "show"
        );

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
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
        days
            .toString()
            .padStart(2, "0");


    hoursElement.innerText =
        hours
            .toString()
            .padStart(2, "0");


    minsElement.innerText =
        mins
            .toString()
            .padStart(2, "0");


    secsElement.innerText =
        secs
            .toString()
            .padStart(2, "0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);



/* ==========================================
   MAIN PHOTO SLIDER
========================================== */

let slideIndex = 0;

let sliderTimer = null;


function getSlides() {

    return document.querySelectorAll(
        ".slide"
    );

}


function showSlide(index) {

    const slides =
        getSlides();


    if (!slides.length) {

        return;

    }


    if (
        index >= slides.length
    ) {

        slideIndex = 0;

    }


    if (
        index < 0
    ) {

        slideIndex =
            slides.length - 1;

    }


    slides.forEach(
        function (slide) {

            slide.classList.remove(
                "active"
            );

        }
    );


    if (slides[slideIndex]) {

        slides[slideIndex]
            .classList.add(
                "active"
            );

    }


    updateSliderDots();

}


function changeSlide(direction) {

    slideIndex += direction;

    showSlide(
        slideIndex
    );

    restartSlider();

}


window.changeSlide =
    changeSlide;



function restartSlider() {

    clearInterval(
        sliderTimer
    );


    sliderTimer =
        setInterval(
            function () {

                slideIndex++;

                showSlide(
                    slideIndex
                );

            },
            3500
        );

}



function createSliderDots() {

    const dotsContainer =
        document.getElementById(
            "sliderDots"
        );


    const slides =
        getSlides();


    if (!dotsContainer) {

        return;

    }


    dotsContainer.innerHTML =
        "";


    slides.forEach(
        function (slide, index) {

            const dot =
                document.createElement(
                    "span"
                );


            dot.className =
                "slider-dot";


            dot.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    slideIndex =
                        index;

                    showSlide(
                        slideIndex
                    );

                    restartSlider();

                }
            );


            dotsContainer.appendChild(
                dot
            );

        }
    );


    updateSliderDots();

}



function updateSliderDots() {

    const dots =
        document.querySelectorAll(
            ".slider-dot"
        );


    dots.forEach(
        function (dot) {

            dot.classList.remove(
                "active-dot"
            );

        }
    );


    if (dots[slideIndex]) {

        dots[slideIndex]
            .classList.add(
                "active-dot"
            );

    }

}



/* ==========================================
   PRE-WEDDING GALLERY
========================================== */

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
        document.getElementById(
            "preWeddingModal"
        );


    if (!modal) {

        return;

    }


    modal.classList.add(
        "active"
    );


    galleryIndex = 0;


    updateGallery();


    document.body.style.overflow =
        "hidden";

}


window.openPreWedding =
    openPreWedding;



function closePreWedding() {

    const modal =
        document.getElementById(
            "preWeddingModal"
        );


    if (!modal) {

        return;

    }


    modal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


window.closePreWedding =
    closePreWedding;



function updateGallery() {

    const image =
        document.getElementById(
            "galleryMainImage"
        );


    const counter =
        document.getElementById(
            "galleryCounter"
        );


    const thumbnails =
        document.querySelectorAll(
            ".thumb"
        );


    if (
        !image ||
        !counter
    ) {

        return;

    }


    image.style.opacity =
        "0";


    setTimeout(
        function () {

            image.src =
                galleryImages[
                    galleryIndex
                ];

            image.style.opacity =
                "1";

        },
        120
    );


    counter.innerText =
        `${galleryIndex + 1} / ${galleryImages.length}`;


    thumbnails.forEach(
        function (thumb) {

            thumb.classList.remove(
                "active-thumb"
            );

        }
    );


    if (
        thumbnails[galleryIndex]
    ) {

        thumbnails[galleryIndex]
            .classList.add(
                "active-thumb"
            );

    }

}



function changeGallery(direction) {

    galleryIndex += direction;


    if (
        galleryIndex >=
        galleryImages.length
    ) {

        galleryIndex = 0;

    }


    if (
        galleryIndex < 0
    ) {

        galleryIndex =
            galleryImages.length - 1;

    }


    updateGallery();

}


window.changeGallery =
    changeGallery;



function selectGallery(index) {

    if (
        index < 0 ||
        index >= galleryImages.length
    ) {

        return;

    }


    galleryIndex =
        index;


    updateGallery();

}


window.selectGallery =
    selectGallery;



/* ==========================================
   MODAL OUTSIDE CLICK
========================================== */

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "preWeddingModal"
            );


        if (
            modal &&
            event.target === modal
        ) {

            closePreWedding();

        }

    }
);



/* ==========================================
   ESC KEY
========================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closePreWedding();

        }

    }
);



/* ==========================================
   GALLERY SWIPE
========================================== */

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener(
    "DOMContentLoaded",
    function () {

        const galleryViewer =
            document.querySelector(
                ".gallery-viewer"
            );


        if (!galleryViewer) {

            return;

        }


        galleryViewer.addEventListener(
            "touchstart",
            function (event) {

                touchStartX =
                    event
                        .changedTouches[0]
                        .screenX;

            },
            {
                passive: true
            }
        );


        galleryViewer.addEventListener(
            "touchend",
            function (event) {

                touchEndX =
                    event
                        .changedTouches[0]
                        .screenX;

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
        touchStartX -
        touchEndX;


    if (
        Math.abs(difference) < 40
    ) {

        return;

    }


    if (
        difference > 0
    ) {

        changeGallery(1);

    } else {

        changeGallery(-1);

    }

}



/* ==========================================
   WHATSAPP WISHES
========================================== */

function sendToWhatsApp(event) {

    if (event) {

        event.preventDefault();

    }


    const nameElement =
        document.getElementById(
            "wishName"
        );


    const phoneElement =
        document.getElementById(
            "wishPhone"
        );


    const messageElement =
        document.getElementById(
            "wishMessage"
        );


    if (
        !nameElement ||
        !phoneElement ||
        !messageElement
    ) {

        return;

    }


    const name =
        nameElement.value.trim();


    const phone =
        phoneElement.value.trim();


    const message =
        messageElement.value.trim();


    if (
        !name ||
        !phone ||
        !message
    ) {

        alert(
            "Please fill all the fields."
        );

        return;

    }


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
        encodeURIComponent(
            whatsappMessage
        );


    window.open(
        whatsappUrl,
        "_blank"
    );

}


window.sendToWhatsApp =
    sendToWhatsApp;



/* ==========================================
   PAGE LOAD
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* Slider */

        createSliderDots();

        showSlide(0);

        restartSlider();


        /* Gallery */

        updateGallery();


        /* Countdown */

        updateCountdown();


        /* TAP TO OPEN */

        const overlay =
            document.getElementById(
                "welcomeOverlay"
            );


        const tapButton =
            document.getElementById(
                "tapOpenBtn"
            );


        if (tapButton) {

            tapButton.addEventListener(
                "click",
                function (event) {

                    openInvitation(
                        event
                    );

                }
            );

        }


        if (overlay) {

            overlay.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        overlay
                    ) {

                        openInvitation(
                            event
                        );

                    }

                }
            );

        }

    }
);



/* ==========================================
   PREVENT IMAGE DRAG
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        document
            .querySelectorAll("img")
            .forEach(
                function (image) {

                    image.addEventListener(
                        "dragstart",
                        function (event) {

                            event.preventDefault();

                        }
                    );

                }
            );

    }
);



/* ==========================================
   FINAL
========================================== */

console.log(
    "Mansi & Dr. Nishu Wedding Website Loaded Successfully ❤️"
);
