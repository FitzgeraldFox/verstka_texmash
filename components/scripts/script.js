$(document).ready(function(){
    $('.tooltip').hide();

    if(localStorage.getItem("font-size-current")){
       $('html').css('font-size', localStorage.getItem("font-size-current"));
    }

    if(window.screen.availWidth < 980){
        var mobile_menu_enable = true;
    } else {
        var mobile_menu_enable = false;
    }
    window.onresize = function(){
        if(window.screen.availWidth > 980){
            $('#main_menu_wrap').show();
            mobile_menu_enable = false;
        } else {
            $('#main_menu_wrap').hide();
            mobile_menu_enable = true;
        }
    };
    function hashUpdate() {
        if (window.location.hash.length == 0) {
            updateHashBlocks($('#main_menu a[href="#works"]'), '#works')
        } else {
            var haveBlockOnPage = false;
            $(data_menu).each(function (i, el) {
                if ('#' + el == window.location.hash) {
                    haveBlockOnPage = true;
                    $('#main_menu a').each(function (j, link) {
                        if ($(link).attr('href') == '#' + el) {
                            updateHashBlocks($(link), '#' + el);
                            return false;
                        }
                    });
                    return false;
                }
            });
            if (!haveBlockOnPage) {
                updateHashBlocks($('#main_menu a[href="#works"]'), '#works')
            }
        }
    }

    function updateHashBlocks(menu_link, blockHash){
        $('#main_menu a').removeClass('active');
        menu_link.addClass('active');
        $('main > *.active').fadeOut(200);
        setTimeout(
            function () {
                $('main > *.active').removeClass('active');
                $(blockHash).fadeIn(200);
                setTimeout(
                    function () {
                        $(blockHash).addClass('active');
                    }
                    , 200
                );
            }
            , 200
        );
    }

    (function init(){

        window.addEventListener('hashchange', hashUpdate);

        data_menu = [];
        $('[data-menu-options]').each(function(i, el){
            data_options = $(el).attr('data-menu-options');
            $.parseJSON(data_options, function(key, value) {
                if (key == 'option' || key.length == 0) ;
                else {
                    if(data_menu.indexOf(key) == -1){
                        data_menu[i] = key;
                    }
                }
            });
        });

        hashUpdate();
    })();

    const slider = new Swiper('#main_slider', {
        speed: 400,
        autoplay: 6000,
        grabCursor: true,
        loop: true
    });

    $('#main_slider .swiper-button-prev').click(function(){
        slider.slidePrev();
    });

    $('#main_slider .swiper-button-next').click(function(){
        slider.slideNext();
    });

    $('#order_upload_hidden').change(function(){
        if($('#order_upload_hidden').val().length > 0){
            $('#orderDeleteUploadedFile').fadeIn(300);
            $('#orderUploadedFile').html('Загруженный файл:<br>'+$('#order_upload_hidden').val());
        } else {
            $('#orderDeleteUploadedFile').fadeOut(300);
        }
    });
    $('#orderUploadButton').click(function(){
        $('#order_upload_hidden').click();
    });
    $('#orderDeleteUploadedFile').click(function(){
        $('#order_upload_hidden').val('');
        $('#orderDeleteUploadedFile').fadeOut(300);
        $('#orderUploadedFile').html('');
    });

    $('#consult_upload_hidden').change(function(){
        if($('#consult_upload_hidden').val().length > 0){
            $('#consultDeleteUploadedFile').fadeIn(300);
            $('#consultUploadedFile').html('Загруженный файл:<br>'+$('#consult_upload_hidden').val());
        } else {
            $('#consultDeleteUploadedFile').fadeOut(300);
        }
    });
    $('#consultUploadButton').click(function(){
        $('#consult_upload_hidden').click();
    });
    $('#consultDeleteUploadedFile').click(function(){
        $('#consult_upload_hidden').val('');
        $('#consultDeleteUploadedFile').fadeOut(300);
        $('#consultUploadedFile').html('');
    });

    $('[data-menu-options]').click(function(e){
        arr = $.map($(this).data('menu-options'), function(value, index) {
            return [index];
        });
        arr.splice(0, 1);
        updateHashBlocks($('#main_menu a[href="#' + arr + '"]'), '#' + arr);
        if(mobile_menu_enable){
            $("#main_menu_wrap").fadeOut(300);
        }
    });

    $('#mobile_menu').click(function(){
        $('#main_menu_wrap').fadeToggle(300);
    });

    $('.show_tooltip').click(function(){
        $(this).children('.tooltip').fadeToggle(200);
    });
    $('.close-tooltip').click(function(){
        $(this).parent('.show-tooltip').click();
    });

    $('.change_fz_item').click(function(e){
        if(!localStorage.getItem("font-size-original")){
            localStorage.setItem("font-size-original", "25px");
            localStorage.setItem("font-size-current", "25px");
        }
        if(!$(this).data('size-original')){
            $('html').css('font-size', parseInt($('html').css('font-size')) * $(this).data('font-size'));
            localStorage.setItem("font-size-current", $('html').css('font-size'));
        } else {
            $('html').css('font-size', localStorage.getItem("font-size-original"));
            localStorage.setItem("font-size-current", "25px");
        }
        e.stopPropagation();
    });
});