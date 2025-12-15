$('.list-unstyled li').click(function () {
    $('.active').removeClass('active');
    $(this).addClass('active');
    var tinhTrangXe = $(this).attr('data-id');
    $('#TinhTrangXe').val(tinhTrangXe);
    $('.next-form').submit();
});

// Next page
$('.next').click(function () {
    var tinhTrangXe = $('#TinhTrangXe').val();
    if (tinhTrangXe != 0) {
        $('.next-form').submit();
    }
    else {
        $.notify({
            message: 'Vui lòng chọn tình trạng xe để tiếp tục!'
        }, {
            type: 'danger'
        });
    }
});