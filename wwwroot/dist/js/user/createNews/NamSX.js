
$('#nam-san-xuat').change(function () {
    var namSX = $(this).val();
    $('#NamSanXuat').val(namSX);
});

$('.list-unstyled li').click(function () {
    $('.active').removeClass('active');
    $(this).addClass('active');
    var name = $(this).attr('data-name');
    if (name) {
        $('#NamSanXuat').val(name);
        $('.next-form').submit();
    }
});

