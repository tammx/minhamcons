$('.list-unstyled li').click(function () {
    $('.active').removeClass('active');
    $(this).addClass('active');
    var name = $(this).attr('data-name');
    if (name) {
        $('#XuatXu').val(name);
        $('.next-form').submit();
    }
});

// Next page
$('.next').click(function () {
    var xuatXu = $('#XuatXu').val();
    if (xuatXu != 0) {
        $('.next-form').submit();
    }
    else {
        $.notify({
            message: 'Vui lòng chọn xuất xứ xe để tiếp tục!'
        }, {
            type: 'danger'
        });
    }
});