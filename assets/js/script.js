const burger = document.getElementById("burger");
const nav = document.querySelector(".header__nav");
const overlay = document.getElementById("overlay");
const links = document.querySelectorAll(".header__menu a")

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    nav.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("lock");
});

overlay.addEventListener("click", () => {
    closeMenu();
});

links.forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

function closeMenu() {
    burger.classList.remove("active");
    nav.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("lock");
}

const modal = document.querySelector(".modal");
const openButtons = document.querySelectorAll(".open-modal");
const closeBtn = document.querySelector(".modal__close");

openButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        closeMenu();
        modal.classList.add("active");
        document.body.classList.add("lock");
    });
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.classList.remove("lock");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
        document.body.classList.remove("lock");
    }
});

const submitBtn = document.querySelector(".btn__modal");
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");

const nameError = document.querySelector(".name-error");
const phoneError = document.querySelector(".phone-error");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    const nameValid = /^[\p{L}\s]+$/u.test(name)

    const phoneValid = /^[0-9]+$/.test(phone.replace(/\D/g, ""));

phoneInput.addEventListener("input", () => {
    let value = phoneInput.value.replace(/\D/g, "");

    if (!value.startsWith("996")) {
        value = "996" + value;
    }

    value = value.substring(0, 12);

    let formatted = "+996 ";

    if (value.length > 3) {
        formatted += value.substring(3, 6);
    }
    if (value.length >= 6) {
        formatted += " " + value.substring(6, 9);
    }
    if (value.length >= 9) {
        formatted += " " + value.substring(9, 12);
    }

    phoneInput.value = formatted;
});

    nameInput.classList.remove("error-input");
    phoneInput.classList.remove("error-input");

    nameError.textContent = "";
    phoneError.textContent = "";

if (!nameValid) {
    nameError.textContent = "Введите имя (только буквы)";
    nameInput.classList.add("error-input");
    return;
}

if (!phoneValid) {
    phoneError.textContent = "Введите номер";
    phoneInput.classList.add("error-input");
    return;
}

    submitBtn.textContent = "Отправлено!";
    submitBtn.disabled = true;

    setTimeout(() => {
        modal.classList.remove("active");
        document.body.classList.remove("lock");

        submitBtn.textContent = "Отправить";
        submitBtn.disabled = false;

        nameInput.value = "";
        phoneInput.value = "";
    }, 1000);
});


