/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        output = Base64._utf8_decode(output);

        return output;
    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
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
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
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

let send_action = document.querySelector('#submit');
send_action.addEventListener('click', function () {
    let value_1 = price_1.value;
    let value_2 = price_2.value;
    let value_3 = price_3.value;
    let value_6 = price_6.value;
    let type_variant = document.querySelector('.step__labels--type .step__checkbox:checked').value;
    let percent = document.querySelector('.step__labels--percent .step__checkbox:checked').value;
    let email = document.querySelector('#email').value;
    let user_name = document.querySelector('#name').value;
    let user_tel = document.querySelector('#tel').value;
    let user_psc = document.querySelector('#psc').value;
    let message = `<p>Aku výšku hypotéky potrebujete: ${value_1}</p>
                <p>Aka je hodnota nehnuteľnosti: ${value_2}</p>
                <p>Typ nehnutelnosti: ${type_variant}</p>
                <p>Kolko rokov chcete splácať: ${value_3}</p>
                <p>Kolko rokov chcete splácať: ${value_6}</p>
                <p>Kolko % z hodnoty požadujete: ${percent}</p>
                <p>Mailu: ${email}</p>
                <p>Meno a priezvisko: ${user_name}</p>
                <p>Telefon: ${user_tel}</p>
                <p>PSČ: ${user_psc}</p>`;
    let title = 'Hypotéku HYPOmango!';
    sendMail(title, message);
});

function sendMail(subject, message) {
    const API_KEY = '161cc04c8e98ae3f65dedf152de92571';
    const SECRET_KEY = 'b5031574b0ab670d84c3eb4af6745f95';
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.set('Authorization', 'Basic ' + base64.encode('161cc04c8e98ae3f65dedf152de92571' + ":" + 'b5031574b0ab670d84c3eb4af6745f95'));


    const data = JSON.stringify({
        "Messages": [{
            "From": { "Email": "y.vacheslav@gmail.com", "Name": "Vyacheslav" },
            "To": [{ "Email": "y.vacheslav@gmail.com", "Name": "Vyacheslav" }],
            "Subject": subject,
            "TextPart": message
        }]
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
    };

    fetch("https://api.mailjet.com/v3.1/send", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}