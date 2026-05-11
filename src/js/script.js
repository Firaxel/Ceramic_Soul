// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import JustValidate from 'just-validate';

import "/src/sass/style.scss";

const observerOptions = {
    root: null, // стежимо відносно вікна браузера
    threshold: 0.2 // анімація почнеться, коли з'явиться 20% елемента
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Додаємо клас, який запускає анімацію
            entry.target.classList.add('git__forms-img_animation');

            // КЛЮЧОВИЙ МОМЕНТ: видаляємо елемент зі списку спостереження.
            // Тепер анімація не буде скидатися чи залежати від скролу.
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Знаходимо елемент
const imgElement = document.querySelector('.git__forms-img');

// Перевіряємо, чи він існує, і запускаємо спостереження
if (imgElement) {
    observer.observe(imgElement);
}
function initGitValidation() {

    const gitForm = document.querySelector('.git__form');
    if (gitForm) {
        const validator = new JustValidate('.git__form');
        validator
            .addField('#name', [
                { rule: 'required', errorMessage: 'Please, enter your name' },
                { rule: 'minLength', value: 2, errorMessage: 'Name should be at least 2 symbols' },
            ])
            .addField('#email', [
                { rule: 'required', errorMessage: 'Enter your email, please...' },
                { rule: 'email', errorMessage: 'Type correct email, please...' },
            ])
            .addField('#question', [
                { rule: 'required', errorMessage: 'Enter your question, please...' },
                { rule: 'minLength', value: 10, errorMessage: 'Question should be 10 symbols at least...' },
            ], {
                errorsContainer: document.querySelector('#question').parentElement.querySelector(".textarea-error-message"),
            })
            .addField("#checkbox", [
                { rule: "required", errorMessage: 'Please, read the terms and check the box' }
            ], {
                errorsContainer: document.querySelector('#checkbox').parentElement.parentElement.querySelector(".checkbox-error-message"),
            })
            .onSuccess((event) => {
                sendFormData(event.currentTarget)
            });
    }
}

initGitValidation();

// footer form validation
function initFooterValidation() {
    const subscribeForm = document.querySelector(".footer__subscribe");
    if (subscribeForm) {
        const footer__validator = new JustValidate(".footer__subscribe");
        footer__validator
            .addField("#email-subscribe", [
                { rule: "required", errorMessage: "Enter your email, please..." },
                { rule: 'email', errorMessage: 'Type correct email, please...' }
            ], {
                errorsContainer: document.querySelector("#email-subscribe").parentElement.querySelector(".footer-email-error-message"),
            })
            .addField("#checkbox-subscribe", [
                { rule: "required", errorMessage: 'Please, read the terms and check the box' }
            ], {
                errorsContainer: document.querySelector("#checkbox-subscribe").parentElement.parentElement.querySelector(".footer-checkbox-error-message"),
            })
            .onSuccess((event) => {
                sendFormData(event.currentTarget)
            });
    }

    // year update
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

initFooterValidation();

function sendFormData(form) {
    const formData = new FormData(form);
    fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData,
    })
        .then(res => res.json())
        .then(data => {
            console.log("Success", data);
            form.reset();
        })
        .catch(err => console.error("Send error:", err));
}



const burger = document.querySelector(".burger"),
    close = document.querySelector(".header__menu-close"),
    menu = document.querySelector(".header__menu");

burger.addEventListener("click", () => {
    menu.classList.add("header__menu_active");
    document.body.style.overflow = "hidden";
});

close.addEventListener("click", () => {
    menu.classList.remove("header__menu_active");
    document.body.style.overflow = "";

})

// init Swiper:
try {
    const swiper = new Swiper('.works__slider', {
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.icon-right-open',
            prevEl: '.icon-left-open',
        },

        breakpoints: {
            1200: {
                slidesPerView: 3,
                spaceBetween: 5,
            },
            1920: {
                slidesPerView: 3,
                spaceBetween: 35,
            },
        },

        modules: [Navigation, Pagination],
    });
} catch (e) { };

try {
    const tabs = document.querySelectorAll(".catalog__tab");
    const contents = document.querySelectorAll(".catalog__content-item");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            //remove active class from all tabs and content
            tabs.forEach((t) => t.classList.remove("catalog__tab_active"));
            contents.forEach((c) => (c.style.display = "none"));
            //add active class to clicked tab and show related content
            tab.classList.add("catalog__tab_active");
            contents[index].style.display = "grid";
        });
    });

    //show default(first) content on pages opening
    contents.forEach((c, i) => (c.style.display = i === 0 ? "grid" : "none"));
} catch (e) { };

// site search

const searchData = [
    {
        title: "Home",
        url: "index.html",
        content: "ceramic soul handmade craftsmanship home decor pottery dream"
    },
    {
        title: "Our Store",
        url: "catalog.html", // або де у тебе магазин
        content: "shop now buy ceramics unique gift timeless pieces traditional techniques pottery tea coffee set"
    },
    {
        title: "Blog",
        url: "blog.html",
        content: "art of pottery pottery wheel technique clay transformation in the kiln best material for pottery stoneware durability porcelain designs handcrafted pottery textures functional pottery pieces artisan pottery firing process clay types pottery glazing traditional ceramics"
    },
    {
        title: "About us",
        url: "about.html",
        content: "check out our works tea set ceremony portfolio projects handmade artistry traditional craftsmanship pottery workshop creative space working with clay masterclasses handmade art pottery journey ceramics studio personal expression functional ceramics pottery community creative workshop spark creativity pottery skills map "
    }
];

window.runSearch = function () {
    const query = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');

    if (!query) {
        resultsContainer.style.display = 'none';
        return;
    }

    const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
    );

    if (filtered.length > 0) {
        resultsContainer.innerHTML = filtered.map(item => `
            <li><a href="${item.url}">${item.title}</a></li>
        `).join('');
        resultsContainer.style.display = 'block';
    } else {
        resultsContainer.innerHTML = '<li>No results found</li>';
        resultsContainer.style.display = 'block';
    }
}



window.toggleSearch = function () {
    const searchField = document.getElementById('searchField');
    const searchInput = document.getElementById('search-input');

    searchField.classList.toggle('active');

    // Якщо відкрили — ставимо фокус
    if (searchField.classList.contains('active')) {
        searchInput.focus();
    } else {
        // Якщо закрили — очищуємо пошук
        searchInput.value = '';
        document.getElementById('search-results').style.display = 'none';
    }
}

// Закривати пошук, якщо клікнули поза ним
document.addEventListener('click', (e) => {
    const wrapper = document.querySelector('.search-icon-btn');
    const searchField = document.getElementById('searchField');
    if (!wrapper.contains(e.target)) {
        searchField.classList.remove('active');
    }
});
