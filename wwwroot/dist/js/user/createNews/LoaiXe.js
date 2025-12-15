$('.category-item').click(function () {
    $('.active').removeClass('active');
    $(this).addClass('active');
    var id = $(this).attr('data-id');
    var code = $(this).attr('data-code');
    if (id) {
        $('#LoaiXeId').val(id);
        $('#LoaiXe').val(code);
        $('.next-form').submit();
    }
});
