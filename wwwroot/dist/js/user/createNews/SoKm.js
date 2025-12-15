// Next page
$('.next').click(function () {
    var soKm = $('#SoKM').val();
    if (soKm) {
        $('.next-form').submit();
    }
    else {
        $.notify({
            message: 'Vui lòng nhập số km xe đã đi để tiếp tục'
        }, {
            type: 'danger'
        });
    }
});

$("#so-km").keypress(function (event) {
    var sokm = $('#SoKM').val();
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        try {
            if (sokm) {
                $('.next-form').submit();
            }
            else {
                $.notify({
                    message: 'Vui lòng nhập số km xe đã đi để tiếp tục'
                }, {
                    type: 'danger'
                });
            }
        }
        catch (err) {
            alert(err);
        }
    }
});

$('#so-km').keyup(function () {
    var soKM = $(this).val();
    if (soKM) {
        soKM = soKM.replace(/,/g, '').replace(' Km', '').trim();
        $(this).val(formatCurrency(soKM) + ' Km');
    }
    $('#SoKM').val(soKM);

});
$('#so-km').on('keyup keydown keypress click change', function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode != '13') {
        var res = $(this).val();
        setCaretToPos($(this)[0], (res.length - 3));
    }
});