

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

    //учусь/работаю
    var job = $('.job_wrap'),
        buttons = $('.buttons');
    //job.children('div').hide();

    buttons.find('button').click(function(e) {
        e.preventDefault();
        var text = $(this).text();
        $(this).parent('div').fadeOut();
        if (text === "Учусь") {

            $('#study').addClass('active').siblings().removeClass('active');
        }
        else {
            $('#work').addClass('active').siblings().removeClass('active');
        }
        job.slideDown(1150, function () {
            job.find('#back').click(function (e) {
                e.preventDefault();
                job.slideUp(300);
                buttons.fadeIn(300);
            });
        });
        job.children('p').html('<a href="#" id="back"><img src="img/back.png" alt="back"></a>' + text);
    });

    $('.highSchool').append(
        doT.template(
            $('#template_highSchool').text()
        )(_data.highSchool)
    );
    ////selects
    $(".js-example-basic-single").select2();

    $('.highSchool').select2({
        placeholder: "ВУЗ",
        minimumResultsForSearch: -1
    });

    $('#highSchool').on('change',function(){
       $('#over').prop('disabled',false);
    });

    $('#start').select2({
        placeholder: "Год поступления",
        minimumResultsForSearch: -1
    });

    $('.over').select2({
        placeholder: "Год окончания",
        minimumResultsForSearch: -1
    });



    $('#city').select2({
        placeholder: "Город"
    });

    $('#xp').select2({
        minimumResultsForSearch: -1
    });

    for(var i=1950; i<=2015;i++){
        $('#start, .over').append('<option>' + i + '</option>');
    }





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