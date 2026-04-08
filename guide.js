/* ===============================
   AUTO GUIDE SYSTEM
=============================== /

const guideBtn = document.getElementById("autoGuideBtn");
const slides = document.querySelectorAll(".slide");

let guideActive = false;
let currentIndex = 0;
let guideInterval = null;
let userInteracted = false;

/ ===============================
   START / STOP GUIDE
=============================== /

function startGuide() {
    guideActive = true;
    userInteracted = false;
    guideBtn.innerText = "⏸ Stop Guide";

    currentIndex = getCurrentSlideIndex();

    runGuide();
}

function stopGuide() {
    guideActive = false;
    guideBtn.innerText = "▶ Start Guide";

    clearInterval(guideInterval);
}

/ ===============================
   MAIN GUIDE LOOP
=============================== /

function runGuide() {
    clearInterval(guideInterval);

    guideInterval = setInterval(() => {

        if (!guideActive) return;

        if (userInteracted) {
            stopGuide();
            return;
        }

        currentIndex++;

        if (currentIndex >= slides.length) {
            stopGuide();
            return;
        }

        scrollToSlide(currentIndex);

    }, 5000); // 5 sec per slide
}

/ ===============================
   SCROLL TO SLIDE
=============================== /

function scrollToSlide(index) {
    slides[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    highlightSlide(index);
}

/ ===============================
   HIGHLIGHT CURRENT SLIDE
=============================== /

function highlightSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.opacity = "1";
            slide.style.transform = "scale(1)";
        } else {
            slide.style.opacity = "0.5";
            slide.style.transform = "scale(0.98)";
        }
    });
}

/ ===============================
   GET CURRENT SLIDE
=============================== /

function getCurrentSlideIndex() {
    let index = 0;

    slides.forEach((slide, i) => {
        const rect = slide.getBoundingClientRect();

        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            index = i;
        }
    });

    return index;
}

/ ===============================
   BUTTON CLICK
=============================== /

guideBtn.addEventListener("click", () => {
    if (!guideActive) {
        startGuide();
    } else {
        stopGuide();
    }
});

/ ===============================
   USER INTERACTION DETECTION
=============================== /

window.addEventListener("wheel", () => {
    if (guideActive) {
        userInteracted = true;
    }
});

window.addEventListener("touchstart", () => {
    if (guideActive) {
        userInteracted = true;
    }
});

window.addEventListener("keydown", () => {
    if (guideActive) {
        userInteracted = true;
    }
});

/ ===============================
   PAUSE ON HOVER (OPTIONAL)
=============================== /

slides.forEach(slide => {
    slide.addEventListener("mouseenter", () => {
        if (guideActive) {
            clearInterval(guideInterval);
        }
    });

    slide.addEventListener("mouseleave", () => {
        if (guideActive) {
            runGuide();
        }
    });
});

/ ===============================
   RESUME GUIDE (OPTIONAL BUTTON)
=============================== /

function resumeGuide() {
    if (!guideActive) {
        guideActive = true;
        guideBtn.innerText = "⏸ Stop Guide";
        runGuide();
    }
}

/ ===============================
   VISIBILITY CHANGE (TAB SWITCH)
=============================== /

document.addEventListener("visibilitychange", () => {
    if (document.hidden && guideActive) {
        clearInterval(guideInterval);
    } else if (!document.hidden && guideActive) {
        runGuide();
    }
});

/ ===============================
   SMOOTH ENTRY EFFECT
=============================== /

function animateActiveSlide() {
    slides.forEach((slide, i) => {
        const rect = slide.getBoundingClientRect();

        if (rect.top >= 0 && rect.top < window.innerHeight * 0.6) {
            slide.style.opacity = "1";
            slide.style.transform = "translateY(0)";
        } else {
            slide.style.opacity = "0.4";
            slide.style.transform = "translateY(30px)";
        }
    });
}

window.addEventListener("scroll", animateActiveSlide);

/ ===============================
   INIT
=============================== */

window.addEventListener("load", () => {
    highlightSlide(0);
});
