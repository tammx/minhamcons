$('.list-unstyled li').click(function () {
    $('.active').removeClass('active');
    $(this).addClass('active');
    var name = $(this).attr('data-name');
    if (name) {
        $('#MauSac').val(name);
        $('.next-form').submit();
    }
});


// Next page
$('.next').click(function () {
    var mauSac = $('#MauSac').val();
    if (mauSac) {
        $('.next-form').submit();
    }
    else {
        $.notify({
            message: 'Vui lòng chọn màu sắc xe để tiếp tục!'
        }, {
            type: 'danger'
        });
    }
});