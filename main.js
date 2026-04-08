/* ================= LOADER ================= /

// Wait for full page load
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.transition = "opacity 0.6s ease";

        setTimeout(() => {
            loader.style.display = "none";
        }, 600);

    }, 1500); // loader duration (1.5s)
});


/ ================= CURSOR GLOW ================= /

const cursor = document.querySelector(".cursor-glow");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

// Track mouse position
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth follow animation
function animateCursor() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    cursor.style.left = currentX + "px";
    cursor.style.top = currentY + "px";

    requestAnimationFrame(animateCursor);
}

animateCursor();


/ ================= CURSOR HOVER EFFECT ================= /

const hoverElements = document.querySelectorAll("a, button, .card");

hoverElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.style.background = "radial-gradient(circle, rgba(0,207,255,0.25), transparent 70%)";
        cursor.style.transform = "translate(-50%, -50%) scale(1.2)";
    });

    el.addEventListener("mouseleave", () => {
        cursor.style.background = "radial-gradient(circle, rgba(0,207,255,0.15), transparent 70%)";
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
    });
});


/ ================= SMOOTH SCROLL ================= /

// Optional smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


/ ================= BASIC FADE-IN ON SCROLL ================= */

const fadeElements = document.querySelectorAll(".card, .intro, .stat");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 });

fadeElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 0.6s ease";

    observer.observe(el);
});
