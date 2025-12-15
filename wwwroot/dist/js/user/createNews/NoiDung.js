$('#noi-dung').change(function () {
    var noiDung = $(this).val()
    $('.txt-run').text(noiDung.length);
    $("input[name='NoiDung']").val(noiDung);
});

// Next page
$('.next').click(function () {
    var noiDung = $('#NoiDung').val();
    var checkNoiDung = false;
    if (noiDung) {
        checkNoiDung = noiDung.length >= 100;
        if (checkNoiDung) {
            $('.next-form').submit();
        }
        else {
            $.notify({
                message: 'Vui lòng nhập thêm mô tả, tối thiểu 100 kí tự!'
            }, {
                type: 'danger'
            });
        }
    }
    else {
        $.notify({
            message: 'Vui lòng nhập mô tả xe để tiếp tục!'
        }, {
            type: 'danger'
        });
    }
});

$('#noi-dung').keyup(function () {
    var mota = $(this).val();
    if (mota) {
        var countText = mota.length;
        if (countText > 800) {
            $('#noi-dung').val(mota.substring(0, 800));
        }
        else {
            $('.txt-run').text(countText);
        }
    }
});

//$('#noi-dung').keypress(function (event) {
//    if (event.which == 13) {
//        event.preventDefault();
//        var s = $(this).val();
//        $(this).val(s + "\n");
//    }
//});