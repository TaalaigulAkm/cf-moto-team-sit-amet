const toursData = {
    basic: {
        title: 'Экскурсия «БАЗОВЫЙ»',
        time: '1,5 - 2 часа',
        distance: '20 - 25 км',
        difficulty: '5***',
        route: 'Смотровая - Родник - Камень Джигита - Адербиевка - Гора Нексис - Грозовые Ворота - Шашлыки - Цыгельский водопад (чаша любви) - Форсаж',
        images: [
            './assets/media/routes-track-1.webp',
            './assets/media/routes-track-2.webp',
            './assets/media/routes-track-3.webp',
        ]
    },
    extended: {
        title: 'Экскурсия «РАСШИРЕННЫЙ»',
        time: '6 - 8 часов',
        distance: '60 - 70 км',
        difficulty: '5***',
        route: 'Смотровая - Родник - Камень Джигита - Адербиевка - Гора Нексис - Грозовые Ворота - Шашлыки - Цыгельский водопад (чаша любви) - Форсаж',
        images: [
            './assets/media/routes-track-4.webp',
            './assets/media/routes-track-5.webp',
            './assets/media/routes-track-6.webp',
        ]
    },
    experience: {
        title: 'Экскурсия «РИО»',
        time: '4 часа',
        distance: '40 - 50 км',
        difficulty: '5***',
        route: 'Форсаж - Голубая бухта – Заброшенная Тур База – Сухогруз Рио – Форсаж',
        images: [
            './assets/media/routes-track-7.webp',
            './assets/media/routes-track-8.webp',
            './assets/media/routes-track-9.webp',
        ]
    }
};

const vehiclesData = [
    { name: 'UFORCE 1000 EPS (U10 EPS)', price: '4000 ₽', img: './assets/media/routes-track-1.webp', specs: { power: '63 л.с.', engine: '963 см³' } },
    { name: 'CFORCE 1000 EPS (X10 EPS)', price: '6000 ₽', img: './assets/media/routes-track-2.webp', specs: { power: '72 л.с.', engine: '1000 см³' } },
    { name: 'CFMOTO CFORCE 600 EPS',     price: '7000 ₽', img: './assets/media/routes-track-3.webp', specs: { power: '45 л.с.', engine: '580 см³' } },
    { name: 'CFORCE 400L EPS (X4 EPS)',  price: '8000 ₽', img: './assets/media/routes-track-4.webp', specs: { power: '32 л.с.', engine: '400 см³' } },
    { name: 'ZFORCE 1000',               price: '9000 ₽', img: './assets/media/routes-track-5.webp', specs: { power: '80 л.с.', engine: '1000 см³' } },
    { name: 'UFORCE 1000 EPS (U10 EPS)', price: '4000 ₽', img: './assets/media/routes-track-6.webp', specs: { power: '63 л.с.', engine: '963 см³' } },
];

// Определяем тур из URL-параметра
const params = new URLSearchParams(window.location.search);
const tourId = params.get('tour') || 'experience';
const tour = toursData[tourId] || toursData.experience;

// Заполняем заголовок страницы
document.title = `CFMOTO — ${tour.title}`;
document.getElementById('tourTitle').textContent = tour.title;
document.getElementById('tourTime').textContent = tour.time;
document.getElementById('tourDistance').textContent = tour.distance;
document.getElementById('tourDifficulty').textContent = tour.difficulty;
document.getElementById('tourRoute').textContent = tour.route;

// Галерея: изображения + точки
const tourTrack = document.getElementById('tourTrack');
const tourDots = document.getElementById('tourDots');

tour.images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `${tour.title} — фото ${i + 1}`;
    tourTrack.appendChild(img);

    const dot = document.createElement('span');
    dot.classList.add('tour-hero__dot');
    if (i === 0) dot.classList.add('active');
    tourDots.appendChild(dot);
});

// Обновляем активную точку при скролле
const tourSlider = document.getElementById('tourSlider');
tourSlider.addEventListener('scroll', () => {
    const imgWidth = tourSlider.scrollWidth / tour.images.length;
    const activeIndex = Math.round(tourSlider.scrollLeft / imgWidth);
    document.querySelectorAll('.tour-hero__dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
    });
});

// Заполняем карточки квадроциклов
const pricesGrid = document.getElementById('tourPricesGrid');
vehiclesData.forEach((vehicle, i) => {
    const card = document.createElement('div');
    card.classList.add('vehicle-card');
    card.dataset.index = i;
    card.innerHTML = `
        <div class="vehicle-card__img-wrap">
            <img src="${vehicle.img}" alt="${vehicle.name}">
            <button type="button" class="vehicle-card__info-btn">i</button>
        </div>
        <div class="vehicle-card__body">
            <p class="vehicle-card__name">${vehicle.name}</p>
            <p class="vehicle-card__price">${vehicle.price}</p>
        </div>
    `;
    pricesGrid.appendChild(card);
});

// Модалка характеристик квадроцикла
const vehicleModal = document.getElementById('vehicleModal');
const vehicleModalSpecs = document.getElementById('vehicleModalSpecs');
const vehicleModalClose = document.getElementById('vehicleModalClose');

pricesGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.vehicle-card');
    if (!card) return;
    const vehicle = vehiclesData[card.dataset.index];
    vehicleModalSpecs.innerHTML = `
        <p class="vehicle-modal__spec">Мощность: <b>${vehicle.specs.power}</b></p>
        <p class="vehicle-modal__spec">Двигатель: <b>${vehicle.specs.engine}</b></p>
    `;
    vehicleModal.classList.add('active');
});

vehicleModalClose.addEventListener('click', () => vehicleModal.classList.remove('active'));
vehicleModal.addEventListener('click', (e) => {
    if (e.target === vehicleModal) vehicleModal.classList.remove('active');
});

// Счётчик людей
let count = 3;
const counterVal = document.getElementById('counterVal');

document.getElementById('counterInc').addEventListener('click', () => {
    count++;
    counterVal.textContent = count;
});

document.getElementById('counterDec').addEventListener('click', () => {
    if (count > 1) {
        count--;
        counterVal.textContent = count;
    }
});

// Форматирование телефона
const tourPhone = document.getElementById('tourPhone');
tourPhone.addEventListener('input', () => {
    let value = tourPhone.value.replace(/\D/g, '');

    if (!value.startsWith('996')) {
        value = '996' + value;
    }

    value = value.substring(0, 12);

    let formatted = '+996 ';

    if (value.length > 3) formatted += value.substring(3, 6);
    if (value.length >= 6) formatted += ' ' + value.substring(6, 9);
    if (value.length >= 9) formatted += ' ' + value.substring(9, 12);

    tourPhone.value = formatted;
});

// Отправка формы бронирования
const tourName = document.getElementById('tourName');
const tourDate = document.getElementById('tourDate');
const bookingForm = document.getElementById('tourBookingForm');
const submitBtn = bookingForm.querySelector('.tour-booking__btn');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameValid = /^[\p{L}\s]+$/u.test(tourName.value.trim());
    const phoneValid = tourPhone.value.replace(/\D/g, '').length >= 12;
    const dateValid = tourDate.value !== '';

    // if (!nameValid || !phoneValid || !dateValid) return;

    let isValid = true;

if (!nameValid) {
  showError(tourName, 'Введите имя (минимум 2 буквы)');
  isValid = false;
} else {
  clearError(tourName);
}

if (!phoneValid) {
  showError(tourPhone, 'Введите корректный номер');
  isValid = false;
} else {
  clearError(tourPhone);
}

if (!dateValid) {
  showError(tourDate, 'Выберите дату');
  isValid = false;
} else {
  clearError(tourDate);
}

if (!isValid) return;

    submitBtn.textContent = 'Отправлено!';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.textContent = 'Забронировать';
        submitBtn.disabled = false;
        tourName.value = '';
        tourPhone.value = '';
        tourDate.value = '';
        count = 3;
        counterVal.textContent = count;
    }, 1500);
});

function showError(input, message) {
    input.classList.add("input-error");
    input.classList.add("shake");

    setTimeout( () => {
        input.classList.remove("shake");
    }, 300);
    let error = input.parentElement.querySelector(".input-error-text");

    if (!error) {
        error = document.createElement("div");
        error.className = "input-error-text";
        input.parentElement.appendChild(eror);
    }
    error.textContent = message;
    error.classList.add("active")
}

function clearError(input) {
    input.classList.remove("input-error");

    const error = input.parentElement.querySelector("input-error-text");
    if (error) {
        error.classList.remove("active");
    }
}

tourName.addEventListener("input", () => clearError(tourName));
tourPhone.addEventListener("input", () => clearError(tourPhone));
tourDate.addEventListener("input", () => clearError(tourDate));
