_data.formData = {};
_data.subscribeTo = [];
decodeURIComponent(location.search).replace(/^\?/,'').split('&').forEach(function(e){
    var temp;
    temp = e.split('=');
    if(temp[0].indexOf('field_') == 0){
        _data.formData[temp[0]] = temp[1];
    }else if(temp[0].indexOf('d') == 0){
        _data.subscribeTo.push(temp[0])
    }
});
_data.subscribeTo.push('default');
var username = [
    ', ',
    _data.formData.field_name_first,
    _data.formData.field_name_mid
].join(' ').replace(/\s{2,}/g,' ');
if(username.length > 2) $('#userName').text(username);
$(function(){
    ///блок дополнительная информация
    //$('.more').clickToggle(function(){
    //    $('.more_info').show(0);
    //}, function(){
    //    $('.more_info').hide(0)
    //});

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

    $('#highSchool').html(
        doT.template(
            $('#template_highSchool').text()
        )(_data.highSchool)
    );
    ////selects
    $(".js-example-basic-single").select2({
    });

    //$('#VUZ').select2({
    //    placeholder: "ВУЗ"
    //});

    $('#start').select2({
        placeholder: "Год поступления"
    });

    $('#over').select2({
        placeholder: "Год окончания"
    });



    // send form data
    (function(){
        var data = $.extend({
            'subscribe': 'Подписаться',
            'tid': 0,
            'lang': 'ru'
        }, _data.formData);
        function send(){
            var d;
            if(_data.subscribeTo.length){
                d = $.extend(data, _data.subscribs[_data.subscribeTo.shift()]);
                $.ajax({
                    url:"https://smartresponder.ru/subscribe.html",
                    type:'POST',
                    data:d,
                    accepts:{
                        'Access-Control-Allow-Origin':'*',
                        'Access-Control-Allow-Methods': 'POST',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
                    },
                    crossDomain:true,
                    dataType:'jsonp'
                }).success(send).error(send)
            }
        }
        send();
    })();
});