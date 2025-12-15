var phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
// select tinh thanh, quan huyen, xa phuong
$(document).on('change', '#TinhThanhId', function (e) {
    var id = $(this).val();
    e.preventDefault();
    $('#QuanHuyenId').empty();
    $('#QuanHuyenId').append('<option value="">-- Chọn quận huyện --</option>');
    fetch(url.GetQuanHuyen + '/' + id)
        .then((resp) => resp.json())
        .then(function (res) {
            if (res != null && res.length > 0) {
                res.forEach(function (item) {
                    $('#QuanHuyenId').append(`<option value="${item.id}">${item.tenQuanHuyen}</option>`);
                });
            }
        });

    $('#XaPhuongId').empty();
    $('#XaPhuongId').append('<option value="">-- Chọn xã phường --</option>');
});

$(document).on('change', '#QuanHuyenId', function (e) {
    var id = $(this).val();
    e.preventDefault();
    $('#XaPhuongId').empty();
    $('#XaPhuongId').append('<option value="">-- Chọn xã phường --</option>');
    fetch(url.GetXaPhuong + '/' + id)
        .then((resp) => resp.json())
        .then(function (res) {
            if (res != null && res.length > 0) {
                res.forEach(function (item) {
                    $('#XaPhuongId').append(`<option value="${item.id}">${item.tenXaPhuong}</option>`);
                });
            }
        });
});

$('#avatar_file').change(function () {
    var input = document.getElementById('avatar_file');
    var files = input.files;
    var formData = new FormData();
    formData.append("path", "cuahang");
    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }
    var oldHinhNen = $('#HinhDaiDien').val();
    if (oldHinhNen) {
        deleteImage(oldHinhNen);
    }

    $.ajax({
        url: url.UploadImage,
        data: formData,
        processData: false,
        async: false,
        contentType: false,
        type: "POST",
        success: function (res) {
            if (res) {
                console.log(res);
                $('#HinhDaiDien').val(res);
                $('.avatar').attr('src', '/uploads/cuahang/' + res);
            }
        }
    });
})

function deleteImage(fileName) {
    var formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("path", "cuahang");
    $.ajax({
        url: url.DeleteImage,
        data: formData,
        processData: false,
        async: false,
        contentType: false,
        type: "POST",
        success: function (res) {
        }
    });
}

$('#next-page-3').click(function () {
    var xaPhuongId = $('#XaPhuongId').val();
    var diaChi = $('#DiaChi').val();
    var tenCuaHang = $('#TenCuaHang').val();
    var moTa = $('#MoTaNgan').val();
    var dienThoai = $('#DienThoai').val();

    if (!xaPhuongId) {
        $.notify({
            title: '<strong>Lỗi!</strong>',
            message: 'Vui lòng chọn xã phường.'
        }, {
            type: 'danger'
        });
        return;
    }

    if (!diaChi) {
        $.notify({
            title: '<strong>Lỗi!</strong>',
            message: 'Vui lòng nhập địa chỉ.'
        }, {
            type: 'danger'
        });
        return;
    }

    if (!tenCuaHang) {
        $.notify({
            title: '<strong>Lỗi!</strong>',
            message: 'Vui lòng nhập tên cửa hàng.'
        }, {
            type: 'danger'
        });
        return;
    }
    else if (tenCuaHang.length < 10) {
        $.notify({
            title: '<strong>Lỗi!</strong>',
            message: 'Vui lòng nhập tên cửa hàng tối thiếu 10 kí tự.'
        }, {
            type: 'danger'
        });
        return;
    }
    else {
        var resp = checkValidStoreName(tenCuaHang);
        if (resp == false) {
            $.notify({
                title: '<strong>Lỗi!</strong>',
                message: 'Cửa hàng đã tồn tại trong hệ thống. Vui lòng nhập tên cửa hàng khác!'
            }, {
                type: 'danger'
            });
            return;
        }
    }

    if (!moTa) {
        $.notify({
            title: '<strong>Lỗi!</strong>',
            message: 'Vui lòng nhập mô tả cửa hàng.'
        }, {
            type: 'danger'
        });
        return;
    }
    else if (moTa.length < 100) {
        $.notify({
            title: '<strong>Lỗi!</strong>',
            message: 'Vui lòng nhập mô tả cửa hàng tối thiểu 100 kí tự.'
        }, {
            type: 'danger'
        });
        return;
    }

    if (!dienThoai) {
        $.notify({
            title: '<strong>Lỗi!</strong>',
            message: 'Vui lòng nhập số điện thoại.'
        }, {
            type: 'danger'
        });
        return;
    }
    else if (dienThoai.length < 10 || dienThoai.length > 12) {
        $.notify({
            title: '<strong>Lỗi!</strong>',
            message: 'Số điện thoại không đúng.'
        }, {
            type: 'danger'
        });
        return;
    }

    if (xaPhuongId && diaChi && tenCuaHang && tenCuaHang.length > 10 && moTa && moTa.length > 100 && dienThoai && checkValidStoreName(tenCuaHang)) {
        $('form').submit();
    }
});

function checkValidStoreName(tenCuaHang) {
    var resp = false;
    const data = new FormData();
    data.append("storeName", tenCuaHang);
    console.log(data);
    $.ajax({
        url: '/cua-hang/check-store-name',
        data: data,
        processData: false,
        contentType: false,
        async: false,
        type: "POST",
        success: function (res) {
            console.log(res);
            resp = res;
        }
    });

    return resp;
}

function nextStep1() {
    if ($('#agree').is(":checked") == false) {
        $.notify({
            title: '<strong>Lỗi!</strong>',
            message: 'Vui lòng đồng ý với điều khoản sử dụng của Xe Tốt.'
        }, {
            type: 'danger'
        });
        return;
    }
    else {
        $('.form-2').submit();
    }
}
$('#DienThoai').blur(function (e) {
    phone = $(this).val();
    var valid = phoneRe.test(phone);
    if (!valid || phone.length < 10 || phone.length > 12) {
        $.notify({
            title: '<strong>Lỗi!</strong>',
            message: 'Số điện thoại không đúng.'
        }, {
            type: 'danger'
        });
    }
});

$('#MoTaNgan').keyup(function () {
    var mota = $(this).val();
    if (mota) {
        var countText = mota.length;
        if (countText > 500) {
            $('#noi-dung').val(mota.substring(0, 500));
        }
    }
});

$('#TenCuaHang').keyup(function () {
    var tenCuaHang = $(this).val();
    if (tenCuaHang) {
        var countText = tenCuaHang.length;
        if (countText > 80) {
            $(this).val(tenCuaHang.substring(0, 80));
        }
    }
});

$('#DiaChi').keyup(function () {
    var diaChi = $(this).val();
    if (diaChi) {
        var countText = diaChi.length;
        if (countText > 80) {
            $(this).val(diaChi.substring(0, 80));
        }
    }
});

$('#btnAdd').click(function (e) {
    e.preventDefault();
    var checked = $("input[name='Goi-Id']").is(":checked");
    if (checked) {
        var goiId = $("input[name='Goi-Id']:checked").val();
        if (goiId && goiId != 0) {
            $.ajax({
                type: "get",
                async: false,
                url: '/tao-cua-hang/save-data-store/' + goiId,
                success: function (res) {
                    if (res) {
                        if (res.respCode == 200) {
                            $.fancybox.open({
                                src: '#popup-success',
                                type: 'inline',
                                touch: false,
                                opts: {
                                    afterShow: function (instance, current) {
                                        // console.info( 'done!' );
                                    }
                                }
                            });
                        }
                        else {
                            $.notify({
                                title: '<strong>Lỗi!</strong>',
                                message: res.message
                            }, {
                                type: 'danger'
                            });
                            return;
                        }
                    }
                },
            });
        }
    }
    else {
        $.notify({
            title: '<strong>Lỗi!</strong>',
            message: 'Vui lòng chọn gói cửa hàng.'
        }, {
            type: 'danger'
        });
    }
})

$('.prev-page').click(function (e) {
    e.preventDefault();
    $('.prev-form').submit();
})

$('.prev-page-1').click(function (e) {
    e.preventDefault();
    $('.prev-form-1').submit();
})

$('.prev-page-2').click(function (e) {
    e.preventDefault();
    $('.prev-form-2').submit();
})