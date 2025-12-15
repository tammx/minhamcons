$('#gia-mua-ban').keyup(function () {
    var gia = $(this).val();
    if (gia) {
        gia = gia.replace(/,/g, '').replace('VNĐ', '').trim();
        if (gia.length > 12 || isNaN(gia)) {
            giaStr = gia.toString();
            gia = giaStr.replace(giaStr.charAt(giaStr.length - 4), "");
        }
    }
    $("input[name='GiaMuaBan']").val(gia);
    gia = gia.slice(0, gia.length - 4) + gia.charAt(gia.length - 1);
    if (gia) {
        convert_text(gia + '000');
        var newGia = formatCurrencys(gia);
        $(this).val(newGia);
    }
});

// Next page
$('.next').click(function () {
    var gia = $('#GiaMuaBan').val();
    if (gia && !isNaN(gia) && gia != 0) {
        $('.next-form').submit();
    }
    else {
        $.notify({
            message: 'Vui lòng nhập giá xe để tiếp tục!'
        }, {
            type: 'danger'
        });
    }
});

function convert_text(value) {
    var text = to_vietnamese(value).trim();
    var result = text[0].toUpperCase() + text.slice(1);
    $('#text-money').text(result);
}

// Tra gop
$('#customCheckDisabled1').change(function () {
    var traGop = $(this).is(":checked");
    $("input[name='TraGop']").val(traGop);
});

function initFormat(value) {
    if (value == '0.0') {
        return null;
    }
    else {
        value = value.replace('.0', '');
        convert_text(value);
        var newVal = formatCurrencys(value)
        return newVal.slice(0, newVal.length - 4);
    }
}

$(document).ready(function () {
    var value = $('#gia-mua-ban').val();
    if (value) {
        $('#gia-mua-ban').val(initFormat(value));
    }
});

$("#gia-mua-ban").keypress(function (event) {
    var gia = $(this).val();
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13' && gia) {
        event.preventDefault();
        $('.next-form').submit();
    }
});

$('#gia-mua-ban').on('keyup keydown keypress click change', function (e) {
    var res = $(this).val();
    setCaretToPos($(this)[0], (res.length - 4));
});

function formatCurrencys(value) {
    var result = '';
    var valueArray = value.split('');
    var resultArray = [];
    var counter = 0;
    var temp = '';
    for (var i = valueArray.length - 1; i >= 0; i--) {
        temp += valueArray[i];
        counter++
        if (counter == 3) {
            resultArray.push(temp);
            counter = 0;
            temp = '';
        }
    };
    if (counter > 0) {
        resultArray.push(temp);
    }
    for (var i = resultArray.length - 1; i >= 0; i--) {
        var resTemp = resultArray[i].split('');
        for (var j = resTemp.length - 1; j >= 0; j--) {
            result += resTemp[j];
        };
        if (i > 0) {
            result += ','
        }
    };
    return result + ',000 VNĐ';
}