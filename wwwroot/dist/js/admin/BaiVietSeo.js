
function uploadImage() {
    var oldFile = $('#HinhDaiDien').val();
    if (oldFile) {
        $('#img_up').removeAttr('src');
        deleteImage(oldFile);
        $('#HinhDaiDien').val('');
    }
    var input = document.getElementById('files');
    var files = input.files;
    var formData = new FormData();
    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
        formData.append("path", "baivietseo")
    }

    $.ajax({
        url: url.UploadImage,
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (res) {
            if (res) {
                $('#HinhDaiDien').val(res);
                $('#img_up').attr('src', '/uploads/baivietseo/' + res);
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
    formData.append("files", fileName);
    formData.append("path", "baivietseo")
    $.ajax({
        url: url.DeleteImage,
        processData: false,
        data: formData,
        async: false,
        contentType: false,
        type: "POST",
        success: function (res) {
        }
    });
}