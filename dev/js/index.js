(function($) {
    $.fn.clickToggle = function(func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function() {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };
}(jQuery));

$(function(){
    var form, i, templ,formData;
    templ = doT.template($('#template_delivery_item').text());
    formData = {
        items:[],
        email:true,nameFirst:true,nameLast:true,nameMid:true
    };
    for(i=0; i < _data['delivery_items'].length;i++){
        formData.items[i] = templ(_data['delivery_items'][i]);
    }
    templ = doT.template($('#template_form').text());
    form = $('main .wrapper');
    form.prepend(templ(formData));
    //form = $('#subscribeForm', form);
    //form.on('submit', function(e){
    //    e.preventDefault();
        //console.log(form);
    //});

    //плавный переход на сайт
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });

    // одинаковая высота для блоков с рассылкой
    var elem = $('.theme'),
        max = 0;
    elem.each(function(){
        if($(this).height() > max){
            max = $(this).height();
        }
    });
    elem.height(max);

    ///блок дополнительная информация
    $('.more').clickToggle(function(){
        $('.more_info').show(0);
    }, function(){
        $('.more_info').hide(0)
    });

    var src= $('.subscr_wrap'),
        error1, error2, error3, error = '';

    ///валидация
    $('#subscribe').click(function(e){
        e.preventDefault();
        src.find('input').each(function(){
            if($(this).val()=='' && $(this).attr('placeholder')!='Отчество'){
                $(this).addClass('error');
                    if($(this).attr('placeholder')==='Имя'){
                        error = error1 = 'Пожалуйста, введите ваше имя';
                    }
                        else {
                        if($(this).attr('placeholder')==='Фамилия'){
                            error =   error2 = 'Пожалуйста, введите вашу фамилию';
                        }
                            else {
                            error =   error3 = 'Пожалуйста, введите адрес электронной почты';
                        }
                    }
                $(this).parent('div').append('<p>' + error + '</p>');
            }
            else {
                $(this).removeClass('error');
            }
            $('.error').eq(0).focus();

            $(this).focusout(function(){
                if($(this).attr('placeholder')!='Отчество'){
                    if($(this).val()!=''){
                        $(this).removeClass('error');
                        $(this).parent('div').children('p').remove();
                    }
                    else {
                        $(this).addClass('error');
                            if($(this).attr('placeholder')=='Имя'){
                                $(this).parent('div').append('<p>' + error1 + '</p>');
                            }
                                else {
                                if($(this).attr('placeholder')=='Фамилия'){
                                    $(this).parent('div').append('<p>' + error2 + '</p>');
                                }
                                    else {
                                    $(this).parent('div').append('<p>' + error3 + '</p>');
                                }
                            }
                    }
                }
            });

        });


//        src.find('input').each(function(){
//            $(this).focusout(function(){
//                if($(this).attr('placeholder')!='Отчество'){
//                    if($(this).val()!=''){
//                        $(this).removeClass('error');
//                        $(this).parent('div').children('p').remove();
//                    }
//                    else {
//                        $(this).addClass('error');
//                        $(this).parent('div').append('<p>' + error + '</p>');
//                    }
//                }
//            });
//        });

    });

});