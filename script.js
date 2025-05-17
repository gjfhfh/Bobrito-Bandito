// 1. Галерея с попапом и переключением
let currentIndex = 0;
const galleryImages = [
    "https://img04.rl0.ru/afisha/e1500x1000i/daily.afisha.ru/uploads/images/6/2f/62f586026ecbfcf600d9918ddefd9e06.jpg",
    "https://fbi.cults3d.com/uploaders/25344900/illustration-file/c6ec9a46-9f7b-48a5-841d-e17e285e819b/0x1900-000000-80-0-0.jpg",
    "https://images.cults3d.com/2kbzWeV8_RUWBwnJ1Xax1YMayi8=/516x516/filters:no_upscale()/https://fbi.cults3d.com/uploaders/41050705/illustration-file/4d2e4159-224f-4174-a96e-6c3502b7ef20/schimpanzini-bananini.jpg"
];

function openPopup(index) {
    currentIndex = index;
    updatePopup();
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function updatePopup() {
    const popupImg = document.getElementById("popup-img");
    popupImg.src = galleryImages[currentIndex];
    document.querySelector(".prev").classList.toggle("disabled", currentIndex === 0);
    document.querySelector(".next").classList.toggle("disabled", currentIndex === galleryImages.length - 1);
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        updatePopup();
    }
}

function nextImage() {
    if (currentIndex < galleryImages.length - 1) {
        currentIndex++;
        updatePopup();
    }
}

// 2. Форма с закрытием при клике вне ее
function openFormPopup() {
    const formPopup = document.getElementById("form-popup");
    formPopup.classList.add("show");

    // Добавляем обработчики
    formPopup.addEventListener("click", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
}

function closeFormPopup() {
    const formPopup = document.getElementById("form-popup");
    formPopup.classList.remove("show");

    // Удаляем обработчики
    formPopup.removeEventListener("click", closeOnOutsideClick);
    document.removeEventListener("keydown", closeOnEscape);
}

function closeOnOutsideClick(e) {
    const formContent = document.querySelector(".popup-form-content");
    if (!formContent.contains(e.target)) {
        closeFormPopup();
    }
}

function closeOnEscape(e) {
    if (e.key === "Escape") {
        closeFormPopup();
    }
}

// 3. Валидация формы
function validateForm(formElement, submitBtnId) {
    let valid = true;

    const name = formElement[0].value.trim();
    const email = formElement[1].value.trim();
    const phone = formElement[2].value.trim();
    const text = formElement[3].value.trim();

    const isRussian = /^[\u0400-\u04FF\s]+$/i.test(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{11}$/;

    if (!isRussian) {
        alert("Текст должен быть на русском языке.");
        valid = false;
    }

    if (!emailRegex.test(email)) {
        alert("Введите корректный email.");
        valid = false;
    }

    if (!phoneRegex.test(phone)) {
        alert("Телефон должен содержать ровно 11 цифр.");
        valid = false;
    }

    if (valid) {
        submitForm(submitBtnId);
    }
}

// 4. Изменение кнопки после отправки
function submitForm(buttonId) {
    const btn = document.getElementById(buttonId);
    btn.textContent = "Отправляем...";
    btn.disabled = true;
    btn.style.backgroundColor = "#cccccc";
    btn.style.cursor = "not-allowed";

    setTimeout(() => {
        btn.textContent = "Успешно отправлено!";
        btn.style.backgroundColor = "#2ecc71";
    }, 1500);
}

// 5. Таймер с попапом
document.addEventListener("DOMContentLoaded", function() {
    const timerPopup = document.getElementById("timer-popup");

    if (localStorage.getItem("popupClosed") !== "true") {
        setTimeout(function() {
            timerPopup.style.display = "flex";
            setTimeout(function() {
                timerPopup.classList.add("show");
            }, 10);
        }, 30000);
    }
});

function closeTimerPopup() {
    const timerPopup = document.getElementById("timer-popup");
    timerPopup.classList.remove("show");

    timerPopup.addEventListener("transitionend", function() {
        timerPopup.style.display = "none";
        localStorage.setItem("popupClosed", "true");
    }, { once: true });
}

// 6. Обратный отсчёт
function startCountdown(targetDate) {
    const timerEl = document.getElementById("countdown-timer");

    const update = () => {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            timerEl.textContent = "Поздравляем с получением диплома!";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        timerEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    update();
    const interval = setInterval(update, 1000);
}

startCountdown(new Date("2028-08-31T00:00:00"));

// 7. Фиксация меню
window.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    const heroSectionHeight = document.querySelector(".hero-section").offsetHeight;

    if (window.scrollY >= heroSectionHeight) {
        header.classList.add("fixed");
    } else {
        header.classList.remove("fixed");
    }
});

// 8. Анимация SVG
document.addEventListener("mousemove", (e) => {
    const svg = document.getElementById("svg-element");
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    svg.style.transform = `translate(${x * 50}px, ${y * 50}px) scale(${1 + x * 0.2})`;
});

// Инициализация формы
document.addEventListener("DOMContentLoaded", function () {
    const popupForm = document.getElementById("popup-contact-form");
    if (popupForm) {
        popupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            validateForm(this, "popup-submit-btn");
        });
    }
});
