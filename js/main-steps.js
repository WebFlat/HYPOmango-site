//Mobile menu******************************
let menu = document.querySelector('#menu'),
    list = document.querySelector('#menu-list'),
    nav = document.querySelectorAll('.navigation__list'),
    body = document.querySelector('body');

menu.addEventListener('click', function (e) {
    this.classList.toggle('close');
    list.classList.toggle('show');
    body.classList.toggle('is-fixed');
});

nav.forEach(element => {
    element.addEventListener('click', function () {
        menu.classList.toggle('close');
        list.classList.toggle('show');
        setTimeout(() => {
            body.classList.toggle('is-fixed');
        }, 1500);

    })
});

//Tabs step***********************************
let next_btn = document.querySelectorAll('.btn-next'),
    back_btn = document.querySelectorAll('.btn-prev'),
    sections = document.querySelectorAll('.steps_section');
next_btn.forEach(element => {
    let level = element.getAttribute('data-next');
    element.addEventListener('click', function () {
        sections.forEach(section => {
            section.classList.remove('show');
            document.querySelector(`.steps_section[data-level="${level}"]`).classList.add('show');
        });
    })
});
back_btn.forEach(element => {
    let level = element.getAttribute('data-prev');
    element.addEventListener('click', function () {
        sections.forEach(section => {
            section.classList.remove('show');
            document.querySelector(`.steps_section[data-level="${level}"]`).classList.add('show');
        });
    })
});

//Step with range***************************
function renderSteps(price, range, min, max, next) {
    range.addEventListener('input', function () {
        price.value = this.value;
        if (price.value >= min && price.value <= max) {
            document.querySelector(`.btn-next[data-next="${next}"]`).classList.add('active');
        } else {
            document.querySelector(`.btn-next[data-next="${next}"]`).classList.remove('active');
        }
    });
    price.addEventListener('input', function () {
        range.value = this.value;
        if (price.value >= min && price.value <= max) {
            document.querySelector(`.btn-next[data-next="${next}"]`).classList.add('active');
        } else {
            document.querySelector(`.btn-next[data-next="${next}"]`).classList.remove('active');
        }
    })
}

let price_1 = document.querySelector('.price-step-2'),
    range_1 = document.querySelector('.range-1');
renderSteps(price_1, range_1, 5000, 1000000, 3);

let price_2 = document.querySelector('.price-step-3'),
    range_2 = document.querySelector('.range-2');
renderSteps(price_2, range_2, 100000, 500000, 4);

let price_3 = document.querySelector('.price-step-5'),
    range_3 = document.querySelector('.range-5');
renderSteps(price_3, range_3, 1, 30, 6);

let price_6 = document.querySelector('.price-step-6');
price_6.addEventListener('input', function () {
    if (price_6.value >= 1 && price_6.value <= 500000) {
        document.querySelector('.btn-next[data-next="7"]').classList.add('active');
    } else {
        document.querySelector('.btn-next[data-next="7"]').classList.remove('active');
    }
});

//Step email*******************************
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validate = () => {
    const email = document.querySelector('#email').value;
    if (validateEmail(email)) {
        document.querySelector('.btn-next[data-next="9"]').classList.add('active');
    } else {
        document.querySelector(`.btn-next[data-next="9"]`).classList.remove('active');
    }
    return false;
}

document.querySelector('#email').addEventListener('input', validate);


//Step with 3 inputs*********************
let name_inp = document.querySelector('#name'),
    tel = document.querySelector('#tel'),
    psc = document.querySelector('#psc'),
    validate_1 = false,
    validate_2 = false,
    validate_3 = false;

function validatePhoneNumber(input_str) {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(input_str);
}
name_inp.addEventListener('input', function () {
    if (this.value != '') {
        validate_1 = true;
        if (validate_1 && validate_2 && validate_3) {
            document.querySelector('.btn-next[data-next="10"]').classList.add('active');
        }
    } else {
        validate_1 = false;
        document.querySelector(`.btn-next[data-next="10"]`).classList.remove('active');
    }
});
tel.addEventListener('input', function () {

    if (this.value != '' && validatePhoneNumber(this.value)) {
        validate_2 = true;
        if (validate_1 && validate_2 && validate_3) {
            document.querySelector('.btn-next[data-next="10"]').classList.add('active');
        }
    } else {
        validate_2 = false;
        document.querySelector(`.btn-next[data-next="10"]`).classList.remove('active');
    }
});
psc.addEventListener('input', function () {
    if (this.value != '') {
        validate_3 = true;
        if (validate_1 && validate_2 && validate_3) {
            document.querySelector('.btn-next[data-next="10"]').classList.add('active');
        }
    } else {
        validate_3 = false;
        document.querySelector(`.btn-next[data-next="10"]`).classList.remove('active');
    }
});