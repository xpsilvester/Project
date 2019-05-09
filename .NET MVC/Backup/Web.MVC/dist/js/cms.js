$(function () {

    resizeAll();
    $(window).resize(resizeAll);

    if ($('.passwordForm')) {
        $('.passwordForm input').focus(function () {
            $(this).css('background', '#fefbe2');
        });
        $('.passwordForm input').blur(function () {
            $(this).css('background', '#ffffff');
        });
        $('.passwordForm').submit(function () {
            var newPassword1 = $('.passwordForm').find('input[name="newpw1"]').val(),
                newPassword2 = $('.passwordForm').find('input[name="newpw2"]').val();
            if(newPassword1 !== newPassword2) {
                $('.passwordForm .tips').text('两次密码输入不一致');
                return false;
            }
        });
    }

});

function resizeAll() {
    var wWidth = $(window).width();
    var wHeight = $(window).height();
    $('.wrap').height(wHeight);
    $('#menu .container').height(wHeight - $('#header').height() - 10);
    $('.content').height(wHeight - $('#header').height() - 40 - 10);
    if (wHeight <= 730) {
        $('#menu section ul').css('display', 'none');
        $('#menu section h2').click(function () {
            if ($(this).next('ul').css('display') === 'none') {
                $('#menu section ul').slideUp('fast');
                $(this).next('ul').slideDown('fast');
            } else {
                $(this).next('ul').slideUp('fast');
            }
        })
    } else {
        $('#menu section ul').css('display', 'block');
        $('#menu section h2').unbind('click');
    }
    if (wWidth <= 1280) {
        $('.globleBody').width(1280);
    } else {
        $('.globleBody').css('width', '100%');
    }
}
