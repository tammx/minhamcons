
function replaceImageFiles() {
    var oldFileName = $('#CuaHang_HinhDaiDien').val();
    if (oldFileName) {
        deleteImage(oldFileName);
    }
    var input = document.getElementById('files');
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
        formData.append("path", "cuahang");
    }

    $.ajax({
        url: urls.UploadImage,
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (res) {
            if (res) {
                $('#CuaHang_HinhDaiDien').val(res);
                $('#img_up').attr('src', '/uploads/cuahang/' + res);
                Swal.fire({
                    icon: 'success',
                    title: 'Upload hình ảnh thành công!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Upload hình ảnh thất bại!',
                });
            }
        }
    });
}

function deleteImage(fileName) {
    var formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("path", "cuahang");

    $.ajax({
        url: urls.DeleteImage,
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (res) {
        }
    });
}

$('#kiem-dinh').click(function () {
    var cuaHangId = $('#CuaHang_Id').val();
    if (cuaHangId && cuaHangId != 0) {
        var formData = new FormData();
        formData.append("id", cuaHangId);

        $.ajax({
            url: urls.KiemDinhCuaHang,
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (res) {
                Swal.fire({
                    icon: 'success',
                    title: 'Kiểm định cửa hàng thành công!',
                    showConfirmButton: false,
                    timer: 2500
                });
                location.reload();
            }
        });
    }
})

$('#tu-choi').click(function () {
    var id = $('#CuaHang_Id').val();
    if (id && id != 0) {
        Swal.fire({
            title: 'Lý do từ chối cửa hàng',
            input: 'textarea',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Từ chối',
            showLoaderOnConfirm: true,
            preConfirm: (value) => {
                console.log(value);
                var formData = new FormData();
                formData.append("cuaHangId", id);
                formData.append("ghiChu", value)
                $.ajax({
                    url: '/cua-hang/tu-choi-cua-hang',
                    data: formData,
                    processData: false,
                    contentType: false,
                    type: "POST",
                    success: function (res) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Từ chối cửa hàng thành công',
                            text: "Thông báo đã gởi đến user",
                            showConfirmButton: false,
                            timer: 2500
                        });

                        location.reload();
                    }
                });
            },
        });
    }
})