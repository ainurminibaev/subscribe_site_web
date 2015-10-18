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




    ///select
    var select = $('.select'),
        s_head = $('.select_head');

    //добавление title для каждого пункта селекта и самого селекта
    select.each(function(){
     var title = $(this).find(s_head).children('p').text();
        $(this).find(s_head).children('p').attr('title',title);
        $(this).find('ul').children('li').each(function(){
            $(this).attr('title',$(this).text());
        });
    });

//собт-о сам селект
    s_head.click(function(){
        $(this).parent(select).addClass('active').find('ul').show();
        $(this).closest(select).find('ul').children('li').click(function(){
            var txt =  $(this).text();
            $(this).closest(select).removeClass('active').find('ul').hide();
            $(this).closest(select).find(s_head).find('p').text(txt);
        });

    });

    ///блок дополнительная информация
    $('.more').clickToggle(function(){
        $('.more_info').show(0);
    }, function(){
        $('.more_info').hide(0)
    });

    //учусь/работаю
    var job = $('.job_wrap'),
        buttons = $('.buttons');
    buttons.find('button').click(function(e){
        e.preventDefault();
        var text = $(this).text();
        $(this).parent('div').fadeOut();
        job.slideDown(300, function(){
            job.children('p').html('<a href="#" id="back"><img src="img/back.png" alt="back"></a>' + text);
            job.find('#back').click(function(e){
                e.preventDefault();
                job.slideUp(300);
                buttons.fadeIn(300);
            });
        });


    });

});