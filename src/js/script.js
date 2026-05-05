// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import JustValidate from 'just-validate';

import "/src/sass/style.scss";

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

document.getElementById('year').textContent = new Date().getFullYear();

try {
    const validator = new JustValidate('.git__form');

    validator
        .addField('#name', [
            {
                rule: 'required',
                errorMessage: 'Please, enter your name',
            },
            {
                rule: 'minLength',
                value: 2,
                errorMessage: 'Name should be at least 2 symbols',
            },


        ])
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Enter your email, please...',
            },
            {
                rule: 'email',
                errorMessage: 'Type correct email, please...',
            },
        ])

        .addField('#question', [
            {
                rule: 'required',
                errorMessage: 'Enter your question, please...',
            },
            {
                rule: 'minLength',
                value: 10,
                errorMessage: 'Question should be 10 symbols at least...',
            },
        ], {
            errorsContainer: document.querySelector('#question').parentElement.querySelector(".textarea-error-message"),
        })

        .addField("#checkbox", [
            {
                rule: "required",
                errorMessage: 'Please, read the terms and check the box',
            }
        ], {
            errorsContainer: document.querySelector('#checkbox').parentElement.parentElement.querySelector(".checkbox-error-message"),
        })
} catch (error) {

};

try {
    const footer__validator = new JustValidate(".footer__subscribe");

    footer__validator
        .addField("#email-subscribe", [
            {
                rule: "required",
                errorMessage: "Enter your email, please...",
            },
            {
                rule: 'email',
                errorMessage: 'Type correct email, please...',
            }
        ], {
            errorsContainer: document.querySelector("#email-subscribe").parentElement.querySelector(".footer-email-error-message"),
        })
        .addField("#checkbox-subscribe", [
            {
                rule: "required",
                errorMessage: 'Please, read the terms and check the box',
            }
        ], {
            errorsContainer: document.querySelector("#checkbox-subscribe").parentElement.parentElement.querySelector(".footer-checkbox-error-message"),
        })
} catch (error) {

}
