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
    buttons.find('button').click(function(e){
        e.preventDefault();
        var text = $(this).text();
        $(this).parent('div').fadeOut();
        job.slideDown(1150, function(){
            job.children('p').html('<a href="#" id="back"><img src="img/back.png" alt="back"></a>' + text);
            job.find('#back').click(function(e){
                e.preventDefault();
                job.slideUp(300);
                buttons.fadeIn(300);
            });
        });
    });


    //selects
    $(".js-example-basic-single").select2({
    });

    $('#VUZ').select2({
        placeholder: "ВУЗ"
    });

    $('#start').select2({
        placeholder: "Год поступления"
    });

    $('#over').select2({
        placeholder: "Год окончания"
    });

});