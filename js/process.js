(function($){
    $.feQuestion = function(element,options){
    	var plugin = this;
    	plugin.formListener = {
    		setup : function (){
    			 // Delegate "Preview" button
                //$("#signupbox").delegate('#btn-signup', "click", function(e){
                //    e.preventDefault();
                //    var $btn = $(this).button('loading');
                //    var data = $("#signupform").serialize()+"&action=nth_register_user";
                //    $('#signupform')[0].reset();
                //    $.ajax({
                //        type: 'POST',
                //        url:  MyCongfig.AjaxUrl,
                //        data: data,
                //        dataType: 'text',
                //        async:    false, // for Safari
                //        success:  function(data) {
                //
                //
                //        	if(data){
                //                $('.error-nofiaction').html('Bạn đã đăng ký thành công, vui lòng check mail để kích hoạt tài khoản của bạn');
                //        		$btn.button('reset');
                //                $('.bs-example-modal-sm').modal('show');
                //
                //        	}
                //
                //        }
                //    });
                //});
    		}
    	}
    	plugin.init = function() {
            plugin.formListener.setup();
        }

        plugin.init();
    }
    $.fn.feQuestion = function(options) {
        return this.each(function() {
            if (undefined === $(this).data('feQuestion')) {
                var plugin = new $.feQuestion(this, options);
                $(this).data('feQuestion', plugin);
            }
        });
    };
    $('#signupbox').feQuestion();

})(jQuery);


// js selecter
$(document).ready(function () {
    $(".btn-select").each(function (e) {
        var value = $(this).find("ul li.selected").html();
        if (value != undefined) {
            $(this).find(".btn-select-input").val(value);
            $(this).find(".btn-select-value").html(value);
        }
    });
    var $scrollbar = $("#scrollbar1");
    var $scrollbar_two = $("#scrollbar2");
    var $scrollbar_three = $("#scrollbar3");
    var $scrollbar_four = $("#scrollbar4");
    // var $scrollbar_five = $("#scrollbar5");

    $scrollbar.tinyscrollbar();

    $scrollbar_two.tinyscrollbar();
    $scrollbar_three.tinyscrollbar();
    $scrollbar_four.tinyscrollbar();
    // $scrollbar_five.tinyscrollbar();
    active_menu();
    popup();
    next_preview_tab();
    validate_form();


});

//function checkradio(){
//
//    $('input[type=radio]').each(function () {
//        if (this.checked) {
//            console.log($(this).val());
//        }
//    });
//}

function next_preview_tab(){
    $('.next-page').on('click',function(){
        $('.start-text > .active').next('li').find('a').trigger('click');
        var stt = $('.start-text > .active').next('li').find('a').html();
        var id = $('.start-text > .active').find('a').attr('href');
        stt = parseInt(stt);
        $('a[href="#step11"]').tab('show');
        console.log(id);


        if(stt >= 10){
            var pre = stt - 9 ;
            $('.start-text li').eq( pre ).attr('data-hide','hide');
            $('.start-text li').eq( stt ).removeAttr('data-hide');
        }
    });

    $('.prev-page').click(function(){
        //$('.nav-tabs > .active').prev('li').find('a').trigger('click');
        var stt = $('.nav-tabs > .active').prev('li').find('a').html();
        stt = parseInt(stt);

        $('.nav-tabs > .active').prev('li').find('a').trigger('click');
        if(stt >= 9){
            stt++;
            var pre = stt - 9 ;

            $('.start-text li').eq( stt ).attr('data-hide','hide');
            $('.start-text li').eq( pre ).removeAttr('data-hide');
        }
    });

    $('.end').click(function(){
        var stt = $('.nav-tabs > .active').next('li').find('a').html();
        stt = parseInt(stt);

        $('.nav-tabs > .active').next('li').find('a').trigger('click');
        if(stt >= 10){
            var pre = stt - 9 ;

            $('.start-text li').eq( pre ).attr('data-hide','hide');
            $('.start-text li').eq( stt ).removeAttr('data-hide');
        }
    });

    $('.first').click(function(){
        var stt = $('.nav-tabs > .active').prev('li').find('a').html();
        stt = parseInt(stt);

        $('.nav-tabs > .active').prev('li').find('a').trigger('click');
        if(stt >= 9){
            stt++;
            var pre = stt - 9 ;

            $('.start-text li').eq( stt ).attr('data-hide','hide');
            $('.start-text li').eq( pre ).removeAttr('data-hide');
        }
    });

}
function popup(){
    $('.button-invite').click(function(){
        $('.invite-poup-modal').modal('show');
    });
    $('.sent-invites').click(function(){
        $('.invite-poup-modal').modal('show');
    });

    $('a.close_nofication').click(function(event) {
        $(".bs-example-modal-sm").modal('hide');
    });
    $('.invite-poup-modal').on('shown.bs.modal', function (e) {
        var $scrollbar_five = $("#scrollbar5");
        $scrollbar_five.tinyscrollbar();
    })
    $('.review-result').click(function(){
        $('.review-poups').modal('show');
    });


}

function pouplogin(url){
    $(".login-form").modal('show');
    $('.login-form').on('shown.bs.modal', function (event) {
        var modal = $(this)
        modal.find('.modal-content input[name="_wp_http_referer"]').val(url);
    });
}
function active_menu() {

    var pgurl = window.location.href;
    $(".meunu-li a").each(function(){
        if($(this).attr("href") == pgurl  )
            $(this).parent('.meunu-li').addClass("active");
    })

}

function validate_form(){
    $('#signupform').bootstrapValidator({
        live: 'enabled',
        fields: {
            firstname: {
                validators: {
                    notEmpty: {
                        message: 'Vui lòng nhập tên '
                    }
                }
            },
            lastname: {
                validators: {
                    notEmpty: {
                        message: 'Vui lòng nhập họ tên  '
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Vui lòng nhập email'
                    },
                    emailAddress:{
                        message:"Email không hợp lệ"
                    },

                    remote: {
                        url: MyCongfig.AjaxUrl ,
                        data: function (validator) {
                            return {
                                email: validator.getFieldElements('email').val(),
                                action:'check_mail'
                            };
                        },
                        message: 'Email đã tồn tại',

                    }
                }
            },

        }
    }).on('success.form.bv', function(e) {
        e.preventDefault();

        var $form = $(e.target);
        var bv = $form.data('bootstrapValidator');
        var $btn = $(this).button('loading');
        var data = $("#signupform").serialize()+"&action=register_user";

            $.ajax({
                type: 'POST',
                url:  MyCongfig.AjaxUrl,
                data: data,
                dataType: 'json',
                async:    false, // for Safari
                success:  function(data) {
                    $btn.button('reset');

                    if(data.level){
                        $('.error-nofiaction').html('Bạn không phải thuộc cấp bậc quản lý <br /> vui lòng chọn lại cấp bậc');
                        $('.nofication-poups').modal('show');

                    }

                	if(data.success){

                        $('.error-nofiaction').html('Bạn đã đăng ký thành công, vui lòng check mail để kích hoạt tài khoản của bạn');
                        $('.nofication-poups').modal('show');
                        //$('#signupform')[0].reset();
                	}
                    $('.nofication-poups').on('hidden.bs.modal', function (e) {
                        $("#signupform").bootstrapValidator('resetForm', true);

                    })


                }
            });



    });


    $("#loginform").bootstrapValidator({
        live: 'enabled',
        fields: {
            pass: {
                validators: {
                    notEmpty: {
                        message: 'Vui lòng nhập pass '
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Vui lòng nhập email'
                    },
                    emailAddress:{
                        message:"Email không hợp lệ"
                    },


                }
            },

        }
    }).on('success.form.bv', function(e) {
        e.preventDefault();

        var $form = $(e.target);
        var bv = $form.data('bootstrapValidator');
        //var $btn = $(this).button('loading');
        var data = $("#loginform").serialize()+"&action=ajax_login";

        $.ajax({
            type: 'POST',
            url:  MyCongfig.AjaxUrl,
            data: data,
            dataType: 'json',
            async:    false, // for Safari
            success:  function(data) {
                console.log(data);
                if(data.loggedin){
                    $(".nofication-result").html('Đăng nhập thành công').fadeIn('fast');
                    setTimeout(function(e){
                        $(".login-form").modal('hide');
                        location.href=data.url_referer;
                    },3000);
                }else{
                    $(".nofication-result").html('Email hoặc password không đúng').fadeIn('fast');
                    $("#loginform").bootstrapValidator('resetForm', true);
                }


            }
        });



    });

}

$(document).on('click', '.btn-select', function (e) {
    e.preventDefault();
    var ul = $(this).find("ul");
    if ($(this).hasClass("active")) {
        if (ul.find("li").is(e.target)) {
            var target = $(e.target);
            target.addClass("selected").siblings().removeClass("selected");
            var value = target.attr('id');
            var value_text = target.html();
            $(this).find(".btn-select-input").val(value);
            $(this).find(".btn-select-value").html(value_text);
        }
        ul.hide();
        $(this).removeClass("active");
    }
    else {
        $('.btn-select').not(this).each(function () {
            $(this).removeClass("active").find("ul").hide();
        });
        ul.slideDown(300);
        $(this).addClass("active");
    }
});

$(document).on('click', function (e) {
    var target = $(e.target).closest(".btn-select");
    if (!target.length) {
        $(".btn-select").removeClass("active").find("ul").hide();
    }
});





