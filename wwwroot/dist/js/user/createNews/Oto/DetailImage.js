$(document).ready(function () {
    var hact = hinhAnhChiTiet;
    if (hact) {
        var imgs = '';
        var imageList = hact.split('|');
        if (imageList.length > 0) {
            for (let i = 0; i < imageList.length; i++) {
                var res = imageList[i];
                if (res != null && res.length > 0) {
                    var btn = `onclick ='removeImg("${res}")'`;
                    var liEle = res.split('_')[0];
                    $('.img-preview').append('<li class="' + liEle + '">' +
                        '<img width="141" height="141" src="/uploads/tindang/' + res + '">' +
                        '<a ' + btn + 'class="remove-img delete-img" data-img="' + res + '"><img src="../assets/images/icon/store/ic-close.svg"></a></li>');
                    $('#img-container').val(hact);
                }
            }
        }
    }
    // Next page
    $('.next').click(function () {
        var hinhanhchitiet = $('#img-container').val();
        var video = $('#Video').val();
        if (hinhanhchitiet) {
            var imgLst = hinhanhchitiet.split('|').filter(img => img);
            if (imgLst.length > 4 && checkVideoValid(video)) {
                $('.next-form').submit();
            }
            else if (imgLst.length < 5) {
                $.notify({
                    message: 'Vui lòng upload tối thiểu 5 hình ảnh xe để tiếp tục!'
                }, {
                    type: 'danger'
                });
            }
        }
        else {
            $.notify({
                message: 'Vui lòng upload tối thiểu 5 hình ảnh xe để tiếp tục!'
            }, {
                type: 'danger'
            });
        }
    });

    $('#video-show').change(function () {
        var video = $(this).val();
        $('#Video').val(video);
    });

    Dropzone.autoDiscover = false;
    var myDropzone = new Dropzone("#myDropzone", {
        //parameter name value
        paramName: "files",
        //clickable div id
        clickable: '.previews',
        //preview files container Id
        previewsContainer: false,
        autoProcessQueue: false,
        uploadMultiple: true,
        parallelUploads: 100,
        maxFiles: 20,
        url: "/", // url here to save file
        maxFilesize: 100,//max file size in MB,
        addRemoveLinks: true,
        dictResponseError: 'Server not Configured',
        acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",// use this to restrict file type
        init: function () {
            var self = this;
            //New file added
            self.on("addedfile", function (file) {
                var imgs = $('#img-container').val();
                if (imgs && imgs.split('|').filter(x => x).length > 12) {
                    $.notify({
                        message: 'Bạn chỉ được upload tối đa 12 hình ảnh!'
                    }, {
                        type: 'danger'
                    });
                }
                else {
                    var formData = new FormData();
                    formData.append("files", file);
                    formData.append("path", "tindang");
                    $.ajax({
                        url: urls.UploadTinDangImages,
                        processData: false,
                        data: formData,
                        async: false,
                        contentType: false,
                        type: "POST",
                        success: function (res) {
                            imgs += res + '|';
                            var btn = `onclick ='removeImg("${res}")'`;
                            var liEle = res.split('_')[0];
                            $('.img-preview').append('<li class="' + liEle + '">' +
                                '<img width="141" height="141" src="/uploads/tindang/' + res + '">' +
                                '<a ' + btn + 'class="remove-img delete-img" data-img="' + res + '"><img src="../assets/images/icon/store/ic-close.svg"></a></li>');
                            $('#img-container').val(imgs);
                        }
                    });
                }
            });

            // Send file starts
            self.on("sending", function (file) {
                $('.meter').show();
            });

            // File upload Progress
            self.on("totaluploadprogress", function (progress) {
                $('.roller').width(progress + '%');
            });

            self.on("queuecomplete", function (progress) {
                $('.meter').delay(999).slideUp(999);
            });

            // On removing file
            self.on("removedfile", function (file) {
                var imgVal = $('#img-container').val();
                var fileName = imgVal.split('|').find(function (element) {
                    return element.includes(file.name);
                });
                console.log(fileName);
                $.ajax({
                    url: urls.DeleteImage + '?fileName=' + fileName + '&path=tindang',
                    processData: false,
                    async: false,
                    contentType: false,
                    type: "POST",
                    success: function (res) {
                        imgVal.replace(fileName + '|', '');
                        $('#img-container').val(imgVal);
                    }
                });
            });

            self.on("successmultiple", function (files, response) {
                // Gets triggered when the files have successfully been sent.
                // Redirect user or notify of success.

            });
        }
    });
});

function removeImg(fileName) {
    var removeEle = '.' + fileName.split('_')[0];
    var imgVal = $('#img-container').val();
    $.ajax({
        url: urls.DeleteImage + '?fileName=' + fileName + '&path=tindang',
        processData: false,
        async: false,
        contentType: false,
        type: "POST",
        success: function (res) {
            imgVal = imgVal.replace(fileName + '|', '');
            $('#img-container').val(imgVal);
            $(removeEle).remove();
        }
    });
};

function checkVideoValid(video) {
    if (video && !video.trim().includes('youtube.com')) {
        $.notify({
            message: 'Đường dẫn video youtube không đúng! Vui lòng xem lại!'
        }, {
            type: 'danger'
        });
        return false;
    }
    return true;
}
