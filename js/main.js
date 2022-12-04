//Mobile menu******************************
let menu = document.querySelector('#menu'),
    list = document.querySelector('#menu-list'),
    nav = document.querySelectorAll('.navigation--mobile .navigation__list'),
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