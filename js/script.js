$(document).ready(function () {

    let burgerMenu = $('.burger-menu');
    let menu = $('.main-menu');
    let logo = $('.logo');
    let lang = $('.language');
    let col1 = $('.content-col-1');
    let col3 = $('.content-col-3');


    //Задаем изначальные параметры если ширина браузера < 1024px и т.д.
    if($(window).width() < '1024') {
        menu.attr('data-toggle', 'close');
        displayCol(col3, 'none');
    }

    if($(window).width() < '768') {
        displayCol(col1, 'none');
    }

    function textLogo() {
        if($(window).width() < '500') {
            logo.text('logo');
            lang.text('RU');
        } else {
            logo.text('Company logo');
            lang.text('Options');
        }
    }
    textLogo();

    $(window).resize(function () {

        //Отображение при изменении размера браузера
        if($(window).width() < '1024') {
            displayCol(col3, 'none');
            resizeSlideMenu('absolute');
        } else {
            displayCol(col3, 'block');
            resizeSlideMenu('relative');
        }

        if($(window).width() < '768') {
            displayCol(col1, 'none');
        } else {
            displayCol(col1, 'block');
        }

        textLogo();
    });


    function displayCol(col, diplayProp) {
        col.css({
            display: diplayProp
        });
    }

    //Создаем ф-ию для слайда меню
    function slideMenu (openPos) {

        if (menu.attr('data-toggle') !== 'open') {
            menu.attr('data-toggle', 'open');

            menu.css({
                zIndex: 1000,
                position: openPos,
                left: '0px'
            });

        } else {
            menu.attr('data-toggle', 'close');

            menu.css({
                position: 'absolute',
                left: '-280px'
            });
        }
    }

    //Создаем ф-ию для отображения меню при изменении размера браузера
    function resizeSlideMenu (openPos) {
        if (menu.attr('data-toggle') === 'open') {
            menu.css({
                position: openPos,
                left: '0px'
            });
        } else {
            menu.css({
                position: 'absolute',
                left: '-280px'
            });
        }
    }

    //Слайдирование меню при клике на гамбургер
    burgerMenu.on('click', function () {

        if($(window).width() < '1024') {
                slideMenu('absolute');
        } else {
                slideMenu('relative');
        }

    });

});