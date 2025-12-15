
function replaceImageFiles() {
    var oldFileName = $('#NoiDung').val();
    deleteImage(oldFileName);
    var input = document.getElementById('files');
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
        formData.append("path", "quangcao");
    }

    $.ajax({
        url: urls.UploadImage,
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (res) {
            if (res) {
                $('#NoiDung').val(res);
                $('#img_up').attr('src', '/uploads/quangcao/' + res);
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

function appendNoiDung(page) {
    $('#noidung_ele').empty();
    var ele = '<label asp-for="NoiDung">Nội dung</label>';
    var loaiQC = $('#LoaiKhungQuangCao').val();
    // Hình Ảnh
    if (loaiQC == 1) {
        if (page == 'create') {
            ele += '<input type="text" name="NoiDung" id="NoiDung" class="form-control" style="margin-bottom: 5px;">' +
                '<div class="custom-file"><img height="150" id="img_up" /><br />' +
                '<label class="custom-file" style="margin-top: 5px;">Chọn file</label>' +
                '<input name="NoiDung" class="form-control custom-file-input" id="files" name="files" type="file" onchange="uploadImageFiles();" accept="image/*"  /></div>';
        }
        else if (page == 'edit') {
            ele += '<input type="text" name="NoiDung" id="NoiDung" class="form-control" style="margin-bottom: 5px;">' +
                '<div class="custom-file"><img height="150" id="img_up" /><br /><label class="custom-file" style="margin-top: 5px;">Chọn file</label>' +
                '<input class="form-control custom-file-input" id="files" name="files" type="file" onchange="replaceImageFiles();" accept="image/*" /></div>';
        }
    }
    // Html || Google Adsense
    else if (loaiQC == 2 || loaiQC == 3) {
        ele += '<textarea name="NoiDung" class="form-control"></textarea>';
    }

    $('#noidung_ele').append(ele);
}

function deleteImage(fileName) {
    var formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("path", "quangcao");

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

function uploadImageFiles() {
    var input = document.getElementById('files');
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
        formData.append("path", "quangcao");
    }

    $.ajax({
        url: urls.UploadImage,
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (res) {
            if (res) {
                $('#NoiDung').val(res);
                $('#img_up').attr('src', '/uploads/quangcao/' + res);
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