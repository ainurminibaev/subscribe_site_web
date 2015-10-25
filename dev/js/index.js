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

    //учусь/работаю
    var job = $('.job_wrap'),
        buttons = $('.buttons');
    //job.children('div').hide();

    buttons.find('button').click(function(e){
        e.preventDefault();
        var text = $(this).text();
        $(this).parent('div').fadeOut();
        if(text === "Учусь"){

            $('#study').addClass('active').siblings().removeClass('active');
        }
        else {
            $('#work').addClass('active').siblings().removeClass('active');
        }
        job.slideDown(1150, function(){
            job.find('#back').click(function(e){
                e.preventDefault();
                job.slideUp(300);
                buttons.fadeIn(300);
            });
        });
        job.children('p').html('<a href="#" id="back"><img src="img/back.png" alt="back"></a>' + text);


    });


    var job_html = '<div class="row"><select class="js-example-basic-single" id="city" style="width: 100%">' +
        '<option></option> <option value="AL">Город</option>' +
    '<option value="WY">Казань</option>' +
    '</select></div>';


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

    //валидация формы
    var error;



    var src = $('#src');

    $('#subscribe').click(function(e){
    e.preventDefault();
    src.find('input').each(function(){
      if($(this).attr('id')!='middleName' && $(this).val()==''){
          $(this).addClass('error');
            if($(this).attr('id')=='firstName'){
                error = 'Пожалуйста, введите ваше имя'
            }
                else {
                if($(this).attr('id')=='lastName'){
                    error = 'Пожалуйста, введите вашу фамилию'
                }
                    else {
                    error = 'Пожалуйста, введите адрес электронной почты'
                }
            }
          $(this).parent('.row').append('<p> ' + error + '</p>')

      }
      else {
          $(this).removeClass('error');
      }


  });
    $('.error').eq(0).focus();




});





    //selects
    for(var i=1950;i<2016;i++){
        $('#start').append('<option>' + i +  '</option>');

    }

    $(".js-example-basic-single").select2();

    $('#VUZ').select2({
        placeholder: "ВУЗ",
        minimumResultsForSearch: -1
    });

    $('#start').select2({
        placeholder: "Год поступления",
        minimumResultsForSearch: -1

    });

    $('#over').select2({
        placeholder: "Год окончания",
        minimumResultsForSearch: -1
    });

    $('#city').select2({
        placeholder: "Город",
        Decorator: "DropdownSearch"
    });

    $('#xp').select2({
        minimumResultsForSearch: -1
    })

});