function selectTinhThanh() {
    var tinhThanhId = $('#TinhThanhId').val();
    if (tinhThanhId) {
        $.ajax({
            url: urls.GetQuanHuyenByTinhThanhId + '?tinhThanhId=' + tinhThanhId,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (res) {
                $('#QuanHuyenId').empty();
                $('#XaPhuongId').empty();
                $('#XaPhuongId').attr('disabled');
                $('#QuanHuyenId').append('<option value ="">Chọn quận (huyện)</option>')
                res.forEach(function (item) {
                    $('#QuanHuyenId').append('<option value ="' + item.id + '">' + item.tenQuanHuyen + '</option>')
                });
            }
        });
    }
}

function selectQuanHuyen() {
    var quanHuyenId = $('#QuanHuyenId').val();
    if (quanHuyenId) {
        $.ajax({
            url: urls.GetXaPhuongByQuanHuyenId + '?quanHuyenId=' + quanHuyenId,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (res) {
                $('#XaPhuongId').removeAttr('disabled');
                $('#XaPhuongId').empty();
                $('#XaPhuongId').append('<option value ="">Chọn xã (phường)</option>')
                res.forEach(function (item) {
                    $('#XaPhuongId').append('<option value ="' + item.id + '">' + item.tenXaPhuong + '</option>')
                });
            }
        });
    }
}

function uploadHinhNen() {
    var input = document.getElementById('file_hinhnen');
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }
    var oldHinhNen = $('#HinhNen').val();
    var oldHinhNenThumbnail = $('#HinhNenThumbnail').val();
    if (oldHinhNen) {
        deleteImage(oldHinhNen);
    }
    if (oldHinhNenThumbnail) {
        deleteImage(oldHinhNenThumbnail);
    }
    $.ajax({
        url: urls.UploadImage,
        data: formData,
        processData: false,
        async: false,
        contentType: false,
        type: "POST",
        success: function (res) {
            if (res) {
                console.log(res);
                var imgs = res.split('|');
                $('#HinhNen').val(imgs[0]);
                $('#HinhNenThumbnail').val(imgs[1]);

                $('#img_up').attr('src', '/uploads/tindang/' + imgs[1]);
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
    formData.append("path", "tindang");
    $.ajax({
        url: urls.DeleteImage,
        data: formData,
        processData: false,
        async: false,
        contentType: false,
        type: "POST",
        success: function (res) {
        }
    });
}

function uploadHinhCT() {
    var input = document.getElementById('file_hinhct');
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }
    var oldHinhCt = $('#HinhAnhChiTiet').val();
    var oldHinhctThumbnail = $('#HinhAnhChiTietThumbnail').val();

    $.ajax({
        url: urls.UploadImage,
        data: formData,
        processData: false,
        async: false,
        contentType: false,
        type: "POST",
        success: function (res) {
            if (res) {
                var imgs = res.split('|');
                var img = imgs[0];
                var img_ct = imgs[1];
                oldHinhCt = oldHinhCt + img + '|';
                $('#HinhAnhChiTiet').val(oldHinhCt);
                oldHinhctThumbnail = oldHinhctThumbnail + '|' + img_ct;
                $('#HinhAnhChiTietThumbnail').val(oldHinhctThumbnail);
                $('.image_container').append('<input type="checkbox" class="remove-image-check" value="' + img_ct + '"/><img height="150" id="' + img_ct + '" class="img_ct_up" src="/uploads/tindang/' + img_ct + '" />');
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

function removeImage() {
    var thumbnailImg = $('#HinhAnhChiTietThumbnail').val();
    $.each($(".remove-image-check:checked"), function () {
        var fileName = $(this).val();
        var item = '|' + fileName;
        thumbnailImg = thumbnailImg.replace(item, '');
        $('#HinhAnhChiTietThumbnail').val(thumbnailImg);
        var img = document.getElementById(fileName);
        img.remove();
        $(this).remove();
        // delete thumbnail image
        deleteImage(fileName);
        // delete large image
        deleteImage(fileName.replace('_thumbnail', ''));
    });

    $('#HinhAnhChiTietThumbnail').val(thumbnailImg);
}

$('#submit-form').click(function () {
    var imgCount = $('.img_ct_up').length;
    if (imgCount < 5) {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Số hình ảnh hoặc video upload tối thiểu là 5!',
        })
    }
    else {
        $('form').submit();
    }
});

$('.xu-ly-report').click(function () {
    var id = $(this).attr('data-id');
    Swal.fire({
        title: 'Xử lý tin này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok!'
    }).then((result) => {
        if (result) {
            $.ajax({
                url: '/tindang/xuly/' + id,
                type: "GET",
                async: false,
                success: function () {
                    Swal.fire(
                        'Đã xử lý!',
                        '',
                        'success',
                        1500
                    )
                    location.reload();
                }
            });
        }
    })
})
