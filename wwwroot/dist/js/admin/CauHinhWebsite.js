function uploadImage() {
    var input = document.getElementById('files');
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
        formData.append("loaiCauHinh", "LOGO,CHUNGNHAN")
    }
    // Delete old image
    var oldImage = $('#Content').val().replace(',', '');
    deleteImage(oldImage);

    $.ajax({
        url: urls.UploadImage,
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (res) {
            if (res) {
                $('#Content').val(res);
                $('#img_up').attr('src', '/uploads/sitesetting/' + res);
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

function appendNoiDung() {
    $('#noidung_ele').empty();
    var ele = '<label asp-for="NoiDung">Nội dung</label>';
    var loaiCH = $('#LoaiCauHinh').val();
    // logo
    if (loaiCH == 1) {
        ele += '<input type="text" name="Content" id="Content" class="form-control" readonly style="margin-bottom: 5px;">' +
            '<div class="custom-file"><img height="150" id="img_up" /><br />' +
            '<label class="custom-file" style="margin-top: 5px;">Chọn file</label>' +
            '<input class="form-control custom-file-input" id="files" name="files" type="file" onchange="uploadImage();" accept="image/*" /></div>';
    }
    // slider
    else if (loaiCH >= 18 && loaiCH <= 28) {
        ele += '<input type="text" name="Content" id="Content" class="form-control" readonly style="margin-bottom: 5px;">' +
                    '<div class="image_container"></div>' +
                    '<button type="button" class="btn btn-danger btn-remove-img" onclick="removeImage()">Remove</button>' +
                    '<div class="custom-file"><input class="form-control custom-file-input" id="image-slider" accept="image/*" type="file" onchange="uploadBanerImage();" /></div>';
    }
    else {
        ele += '<textarea name="Content" class="form-control"></textarea>';
    }

    $('#noidung_ele').append(ele);
}

function uploadBanerImage() {
    var input = document.getElementById('image-slider');
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
        formData.append("loaiCauHinh", "BANER");
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
                var noiDungVal = $('#Content').val();
                noiDungVal += res + ',';
                $('#Content').val(noiDungVal);
                $('.image_container').append('<input type="checkbox" class="remove-image-check" value="' + res + '"/><img height="150" id="' + res + '" class="img_ct_up" src="/uploads/sitesetting/' + res + '" />');
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
    var noiDungVal = $('#Content').val();
    $.each($(".remove-image-check:checked"), function () {
        var fileName = $(this).val();
        var item = fileName + ',';
        noiDungVal = noiDungVal.replace(item, '');
        $('#Content').val(noiDungVal);
        var img = document.getElementById(fileName);
        img.remove();
        $(this).remove();
        // delete thumbnail image
        deleteImage(fileName);
    });
}

function deleteImage(fileName) {
    $.ajax({
        url: urls.DeleteCauHinhImage + '?fileName=' + fileName,
        processData: false,
        async: false,
        contentType: false,
        type: "POST",
        success: function (res) {
        }
    });
}