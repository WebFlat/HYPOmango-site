'use strict';

document.addEventListener('DOMContentLoaded', function () {
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


    //Validate*******************************
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    function validatePhoneNumber(input_str) {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(input_str);
    }

    let email = document.querySelector('#form_email'),
        name = document.querySelector('#form_name'),
        tel = document.querySelector('#form_tel'),
        text = document.querySelector('#form_text'),
        form_error = document.querySelector('.form__error'),
        form = document.querySelector('#ContactForm'),
        validate_1 = false,
        validate_2 = false,
        validate_3 = false,
        validate_4 = false,
        send_action = document.querySelector('#submit');

    const validate = () => {
        const email_input = document.querySelector('#form_email').value;
        if (validateEmail(email_input)) {
            validate_2 = true;
            if (validateEmail(email_input) && validate_1 == true && validate_3 == true && validate_4 == true) {
                send_action.classList.add('active');
            }
        } else {
            validate_2 = false;
            send_action.classList.remove('active');
        }
        return false;
    }

    email.addEventListener('input', validate);


    tel.addEventListener('input', function () {
        if (this.value != '' && validatePhoneNumber(this.value)) {
            validate_1 = true;
            if (validate_2 == true && validate_1 == true && validate_3 == true && validate_4 == true) {
                send_action.classList.add('active');
            }
        } else {
            validate_1 = false;
            send_action.classList.remove('active');
        }
    });

    name.addEventListener('input', function () {
        if (this.value != '') {
            validate_3 = true;
            if (validate_2 == true && validate_1 == true && validate_4 == true && validate_3 == true) {
                send_action.classList.add('active');
            }
        } else {
            send_action.classList.remove('active');
            validate_3 = false;
        }
    });

    text.addEventListener('input', function () {
        if (this.value != '') {
            validate_4 = true;
            if (validate_2 == true && validate_1 == true && validate_3 == true && validate_4 == true) {
                send_action.classList.add('active');
            }
        } else {
            send_action.classList.remove('active');
            validate_4 = false;
        }
    });

    function eraseForm() {
        email.value = '';
        name.value = '';
        tel.value = '';
        text.value = '';
    }


    send_action.addEventListener('click', async function (e) {
        e.preventDefault();
        let value_1 = name.value;
        let value_2 = tel.value;
        let value_3 = email.value;
        let value_4 = text.value;
        if (value_1 != '' && value_2 != '' && value_3 != '' && value_4 != '') {
            let formData = new FormData();
            formData.append('value_1', value_1);
            formData.append('value_2', value_2);
            formData.append('value_3', value_3);
            formData.append('value_4', value_4);
            form.classList.add('sending');
            let response = await fetch('sendEmailMain.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                console.log(result.message);
                if (result.message == 'ok') {
                    form.classList.remove('sending');
                    form_error.innerHTML = 'Správa poslaná!';
                    form_error.classList.add('show');
                    eraseForm();
                    setTimeout(function () {
                        form_error.classList.remove('show');
                    }, 2000);
                } else {
                    form.classList.remove('sending');
                    form_error.classList.add('show');
                    setTimeout(function () {
                        form_error.classList.remove('show');
                    }, 2000);
                    eraseForm();
                    console.log('error');
                }
            } else {
                form.classList.remove('sending');
                form_error.classList.add('show');
                setTimeout(function () {
                    form_error.classList.remove('show');
                }, 2000);
                eraseForm();
                console.log('error');
            }
        } else {
            form.classList.remove('sending');
            form_error.classList.add('show');
            setTimeout(function () {
                form_error.classList.remove('show');
            }, 2000);
            eraseForm();
            console.log('error');
        }
    });

});