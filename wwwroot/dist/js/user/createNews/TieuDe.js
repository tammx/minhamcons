
$('#tieu-de').change(function () {
    var tieuDe = $(this).val();
    $("input[name='TieuDe']").val(tieuDe);
});

// Next page
$('.next').click(function () {
    var tieuDe = $('#TieuDe').val();
    if (tieuDe) {
        if (tieuDe.length < 30) {
            $.notify({
                message: 'Vui lòng nhập thêm tiêu đề, tối thiểu 30 kí tự!'
            }, {
                type: 'danger'
            });
        }
        else {
            $('.next-form').submit();
        }
    }
    else {
        $.notify({
            message: 'Vui lòng nhập tiêu đề tin đăng để tiếp tục!'
        }, {
            type: 'danger'
        });
    }
});

$('#tieu-de').keyup(function () {
    var mota = $(this).val();
    $("input[name='TieuDe']").val(mota);
    if (mota) {
        var countText = mota.length;
        if (countText > 85) {
            $(this).val(mota.substring(0, 85));
        }
        else {
            $('.txt-run').text(countText);
        }
    }
});

$('.sugguest-description>ul>li').click(function () {
    var tieude = $(this).text();
    if (tieude) {
        $('#tieu-de').val(tieude);
        $('#TieuDe').val(tieude);
        $('.txt-run').text(tieude.length);
    }
});

$("#tieu-de").keypress(function (event) {
    var tieude = $(this).val();
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        if (tieude) {
            if (tieude.length < 30) {
                $.notify({
                    message: 'Vui lòng nhập thêm tiêu đề để tiếp tục!'
                }, {
                    type: 'danger'
                });
                return;
            }
            else {
                $('.next-form').submit();
            }
        }
        else {
            $.notify({
                message: 'Vui lòng nhập tiêu đề tin đăng để tiếp tục!'
            }, {
                type: 'danger'
            });
        }
    }
});