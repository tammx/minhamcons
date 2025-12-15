//// Loại xe
//$('.loai-xe > li').click(function () {
//    var loaiXeId = $(this).attr('data-id');
//    if (loaiXeId && loaiXeId != 0) {
//        $('#LoaiXeId').val(loaiXeId);
//    }
//    $('.loai-xe > .active').removeClass('active');
//    $(this).addClass('active');
//});

//// Loại tin đăng
//$('.loai-tin-dang > li').click(function () {
//    var loaiTinDang = $(this).attr('data-id');
//    if (loaiTinDang && loaiTinDang != 0) {
//        $('#LoaiTinDang').val(loaiTinDang);
//    }
//    $('.loai-tin-dang > li > .active').removeClass('active');
//    $(this).children().addClass('active');
//});

// Hình ảnh xe
Dropzone.autoDiscover = false;
var myDropzone = new Dropzone("#Dropzone-ImgCar", {
    //parameter name value
    paramName: "files",
    //clickable div id
    clickable: '.previews',
    //preview files container Id
    previewsContainer: false,
    autoProcessQueue: false,
    uploadMultiple: true,
    parallelUploads: 100,
    maxFiles: 12,
    url: "/", // url here to save file
    maxFilesize: 100,//max file size in MB,
    addRemoveLinks: true,
    dictResponseError: 'Server not Configured',
    acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",// use this to restrict file type
    init: function () {
        var self = this;
        //New file added
        self.on("addedfile", function (file) {
            var imgs = $('#HinhAnhChiTietThumbnail').val();
            var formData = new FormData();
            formData.append("files", file);
            formData.append("path", "tindang");
            $.ajax({
                url: url.UploadTinDangImg,
                processData: false,
                data: formData,
                async: false,
                contentType: false,
                type: "POST",
                success: function (res) {
                    if (res != null && res.length > 0) {
                        imgs += res + '|';
                        var liEle = res.split('_')[0];
                        $('.hact-img-container').append(`<li class="${liEle}"><img src="../uploads/tindang/${res}">
                                <a class="remove-img" onclick="removeImage('${res}', 'tindang')"><img src="../assets/images/icon/store/ic-close.svg"></a></li>`);

                        $('#HinhAnhChiTietThumbnail').val(imgs);
                    }
                }
            });
        });

        // Send file starts
        self.on("sending", function (file) {
            console.log('upload started', file);
            $('.meter').show();
        });

        // File upload Progress
        self.on("totaluploadprogress", function (progress) {
            console.log("progress ", progress);
            $('.roller').width(progress + '%');
        });

        self.on("queuecomplete", function (progress) {
            $('.meter').delay(999).slideUp(999);
        });

        // On removing file
        self.on("removedfile", function (file) {
            var imgVal = $('#HinhAnhChiTietThumbnail').val();
            var fileName = imgVal.split('|').find(function (element) {
                return element.includes(file.name);
            });
            console.log(fileName);
            $.ajax({
                url: url.RemoveImg + '?fileName=' + fileName + '&path=tindang',
                processData: false,
                async: false,
                contentType: false,
                type: "POST",
                success: function (res) {
                    console.log(res);
                    imgVal.replace(fileName + '|', '');
                    $('#HinhAnhChiTietThumbnail').val(imgVal);
                }
            });
        });

        self.on("successmultiple", function (files, response) {
            // Gets triggered when the files have successfully been sent.
            // Redirect user or notify of success.

        });
    }
});

function removeImage(fileName, path) {
    var removeEle = '.' + fileName.split('_')[0];
    var imgVal = null;
    if (path === 'tindang') {
        imgVal = $('#HinhAnhChiTietThumbnail').val();
    }
    else if (path === 'cavet') {
        imgVal = $('#HinhAnhCavet').val();
    }
    $.ajax({
        url: url.RemoveImg + '?fileName=' + fileName + '&path=' + path,
        processData: false,
        async: false,
        contentType: false,
        type: "POST",
        success: function (res) {
            console.log(res);
            imgVal = imgVal.replace(fileName + '|', '');
            if (path === 'tindang') {
                $('#HinhAnhChiTietThumbnail').val(imgVal);
            }
            else if (path === 'cavet') {
                $('#HinhAnhCavet').val(imgVal);
            }

            $(removeEle).remove();
        }
    });
}

// select tinh thanh, quan huyen, xa phuong
$(document).on('click', '.select-tinh-thanh > li', function (e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    var currentTinThanhId = $('#TinhThanhId').val();
    if (id && id != currentTinThanhId) {
        $('.select-tinh-thanh > .active').removeClass('active');
        $(this).addClass('active');
        $('#TinhThanhId').val(id);
        $('#QuanHuyenId').val(null);
        $('#XaPhuongId').val(null);
        // Reset Quan huyen
        $('.select-quan-huyen').empty();
        $('.select-quan-huyen').append('<li class="none-info">Quận - Huyện</li>')
        $('.select-xa-phuong').empty();
        $('.select-xa-phuong').append('<li class="none-info">Phường - Xã</li>');

        $.ajax({
            url: url.GetQuanHuyen + '/' + id,
            processData: false,
            async: false,
            contentType: false,
            type: "GET",
            success: function (res) {
                if (res != null && res.length > 0) {
                    res.forEach(function (item) {
                        $('.select-quan-huyen').append(`<li data-id="${item.id}"><a href="javascript:;">${item.tenQuanHuyen} <img src="../assets/images/creat-news/ic-arrow-right.svg"></a></li>`);
                    });
                }
            }
        });
    }
});

$(document).on('click', '.select-quan-huyen > li', function (e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    var currentId = $('#QuanHuyenId').val();
    if (id && id != currentId) {
        if ($('.select-quan-huyen > li').hasClass('active')) {
            $('.select-quan-huyen > .active').removeClass('active');
        }
        $(this).addClass('active');
        $('#QuanHuyenId').val(id);
        $('#XaPhuongId').val(null);
        // Reset Quan huyen
        $('.select-xa-phuong').empty();
        $('.select-xa-phuong').append('<li class="none-info">Phường - Xã</li>');

        $.ajax({
            url: url.GetXaPhuong + '/' + id,
            processData: false,
            async: false,
            contentType: false,
            type: "GET",
            success: function (res) {
                if (res != null && res.length > 0) {
                    res.forEach(function (item) {
                        $('.select-xa-phuong').append(`<li data-id="${item.id}"><a href="javascript:;">${item.tenXaPhuong} <img src="../assets/images/creat-news/ic-arrow-right.svg"></a></li>`);
                    });
                }
            }
        });
    }
});

$(document).on('click', '.select-xa-phuong > li', function (e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    var currentId = $('#XaPhuongId').val();
    if (id && id != currentId) {
        if ($('.select-xa-phuong > li').hasClass('active')) {
            $('.select-xa-phuong > .active').removeClass('active');
        }
        $(this).addClass('active');
        $('#XaPhuongId').val(id);
    }
});

//Change
$(document).on('change', "#TinhThanhId", function () {
    var id = $(this).val();
    if (id) {
        $('#QuanHuyenId').empty();
        $('#XaPhuongId').empty();
        $('#XaPhuongId').append(`<option value="">Chọn xã phường</option>`);
        $('#QuanHuyenId').append(`<option value="">Chọn quận huyện</option>`);
        $.ajax({
            url: url.GetQuanHuyen + '/' + id,
            processData: false,
            async: false,
            contentType: false,
            type: "GET",
            success: function (res) {
                if (res != null && res.length > 0) {
                    res.forEach(function (item) {
                        $('#QuanHuyenId').append(`<option value="${item.id}">${item.tenQuanHuyen}</option>`)
                    });
                }
            }
        });
    }
});

$(document).on('change', "#QuanHuyenId", function () {
    var id = $(this).val();
    if (id) {
        $('#XaPhuongId').empty();
        $('#XaPhuongId').append(`<option value="">Chọn xã phường</option>`);
        $.ajax({
            url: url.GetXaPhuong + '/' + id,
            processData: false,
            async: false,
            contentType: false,
            type: "GET",
            success: function (res) {
                if (res != null && res.length > 0) {
                    res.forEach(function (item) {
                        $('#XaPhuongId').append(`<option value="${item.id}">${item.tenXaPhuong}</option>`)
                    });
                }
            }
        });
    }
});

$(document).on('change', "#HangXeId", function () {
    var id = $(this).val();
    if (id) {
        $('#DongXeId').empty();
        $('#DongXeId').append(`<option value="">Chọn dòng xe</option>`);
        $('#PhienBan').empty();
        $('#PhienBan').append(`<option value="">Chọn phiên bản</option>`);
        $.ajax({
            url: url.GetDongXe + '/' + id,
            processData: false,
            async: false,
            contentType: false,
            type: "GET",
            success: function (res) {
                if (res != null && res.length > 0) {
                    res.forEach(function (item) {
                        $('#DongXeId').append(`<option value="${item.id}">${item.tenDanhMucChiTiet}</option>`)
                    });
                }
            }
        });
    }
});

$(document).on('change', "#NamSanXuat", function () {
    var id = $(this).val();
    var dongXeId = $('#DongXeId').val();
    if (id) {
        $('#PhienBan').empty();
        $('#PhienBan').append(`<option value="">Tôi không rõ</option>`);
        $.ajax({
            url: url.GetPhienBan + '/' + dongXeId + '/' + id,
            processData: false,
            async: false,
            contentType: false,
            type: "GET",
            success: function (res) {
                if (res != null && res.length > 0) {
                    res.forEach(function (item) {
                        $('#PhienBan').append(`<option value="${item.id}">${item.tenDanhMucChiTiet}</option>`)
                    });
                }
            }
        });
    }
});

// select hang xe, dong xe, nam sx
$(document).on('click', '.select-hang-xe > li', function (e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    var currentId = $('#HangXeId').val();
    if (id && id != currentId) {
        $('.select-hang-xe > .active').removeClass('active');
        $(this).addClass('active');
        $('#HangXeId').val(id);
        $('#DongXeId').val(null);
        $('#PhienBan').val(null);
        // Reset Dong Xe
        $('.select-dong-xe').empty();
        $('.select-dong-xe').append('<li class="none-info">Dòng xe</li>');
        $('.select-phien-ban').empty();
        $('.select-phien-ban').append('<li class="none-info">Phiên bản</li>');

        $.ajax({
            url: url.GetDongXe + '/' + id,
            processData: false,
            async: false,
            contentType: false,
            type: "GET",
            success: function (res) {
                if (res != null && res.length > 0) {
                    res.forEach(function (item) {
                        $('.select-dong-xe').append(`<li data-id="${item.id}"><a href="javascript:;">${item.tenDanhMucChiTiet} <img src="../assets/images/creat-news/ic-arrow-right.svg"></a></li>`);
                    });
                }
            }
        });
    }
});

$(document).on('click', '.select-dong-xe > li', function (e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    var currentId = $('#DongXeId').val();
    if (id && id != currentId) {
        if ($('.select-dong-xe > li').hasClass('active')) {
            $('.select-dong-xe > .active').removeClass('active');
        }
        $(this).addClass('active');
        $('#DongXeId').val(id);
    }
});

$(document).on('click', '.select-namsx > li', function (e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    var currentId = $('#NamSanXuat').val();
    if (id && id != currentId) {
        if ($('.select-namsx > li').hasClass('active')) {
            $('.select-namsx > .active').removeClass('active');
        }
        $('#PhienBan').val(null);
        $('.select-phien-ban').empty();
        $('.select-phien-ban').append('<li class="none-info">Phiên bản</li>');
        $(this).addClass('active');
        $('#NamSanXuat').val(id);
        var dongXeId = $('#DongXeId').val();
        $.ajax({
            url: url.GetPhienBan + '/' + dongXeId + '/' + id,
            processData: false,
            async: false,
            contentType: false,
            type: "GET",
            success: function (res) {
                if (res != null && res.length > 0) {
                    res.forEach(function (item) {
                        $('.select-phien-ban').append(`<li data-id="${item.tenDanhMucChiTiet}"><a href="javascript:;">${item.tenDanhMucChiTiet} <img src="../assets/images/creat-news/ic-arrow-right.svg"></a></li>`);
                    });
                }
            }
        });
    }
});

$(document).on('click', '.select-phien-ban > li', function (e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    var currentId = $('#PhienBan').val();
    if (id && id != currentId) {
        if ($('.select-phien-ban > li').hasClass('active')) {
            $('.select-phien-ban > .active').removeClass('active');
        }
        $(this).addClass('active');
        $('#PhienBan').val(id);
    }
});


// Submit form
$(document).ready(function () {
    var gia = $('#GiaMuaBan').val();
    if (gia != 'undefined') {
        if (gia && gia.includes('.')) {
            gia = gia.slice(0, gia.indexOf('.'));
        }
        $('#gia-mua-ban').val(formatCurrency(gia) + ' VNĐ');
    }


    var soKm = $('#SoKM').val();
    if (soKm && soKm != 'undefined' && soKm.length > 3) {
        soKm = formatCurrency(soKm);
    }
    $('#so-km').val(soKm + ' Km');

    var tinhTrangXe = $('#TinhTrangXe').val();
    if (tinhTrangXe == 1) {
        // Hình ảnh cavet
        initCavetImage();
    }
});

function initCavetImage() {
    var myDropzone = new Dropzone("#Dropzone-ImgCarCavet", {
        //parameter name value
        paramName: "files",
        //clickable div id
        clickable: '.previews1',
        //preview files container Id
        previewsContainer: false,
        autoProcessQueue: false,
        uploadMultiple: true,
        parallelUploads: 100,
        maxFiles: 2,
        url: "/", // url here to save file
        maxFilesize: 100,//max file size in MB,
        addRemoveLinks: true,
        dictResponseError: 'Server not Configured',
        acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",// use this to restrict file type
        init: function () {
            var self = this;
            //New file added
            self.on("addedfile", function (file) {
                var imgs = $('#HinhAnhCavet').val();
                var formData = new FormData();
                formData.append("files", file);
                formData.append("path", "cavet");
                $.ajax({
                    url: url.UploadImg,
                    processData: false,
                    data: formData,
                    async: false,
                    contentType: false,
                    type: "POST",
                    success: function (res) {
                        if (res != null && res.length > 0) {
                            imgs += res + '|';
                            var liEle = res.split('_')[0];
                            $('.cavet-img-container').append(`<li class="${liEle}"><img src="../uploads/cavet/${res}">
                                <a class="remove-img" onclick="removeImage('${res}', 'cavet')"><img src="../assets/images/icon/store/ic-close.svg"></a></li>`);

                            $('#HinhAnhCavet').val(imgs);
                        }
                    }
                });
            });

            // Send file starts
            self.on("sending", function (file) {
                console.log('upload started', file);
                $('.meter').show();
            });

            // File upload Progress
            self.on("totaluploadprogress", function (progress) {
                console.log("progress ", progress);
                $('.roller').width(progress + '%');
            });

            self.on("queuecomplete", function (progress) {
                $('.meter').delay(999).slideUp(999);
            });

            // On removing file
            self.on("removedfile", function (file) {
                var imgVal = $('#HinhAnhCavet').val();
                var fileName = imgVal.split('|').find(function (element) {
                    return element.includes(file.name);
                });
                console.log(fileName);
                $.ajax({
                    url: url.RemoveImg + '?fileName=' + fileName + '&path=cavet',
                    processData: false,
                    async: false,
                    contentType: false,
                    type: "POST",
                    success: function (res) {
                        console.log(res);
                        imgVal.replace(fileName + '|', '');
                        $('#HinhAnhCavet').val(imgVal);
                    }
                });
            });

            self.on("successmultiple", function (files, response) {
                // Gets triggered when the files have successfully been sent.
                // Redirect user or notify of success.

            });
        }
    });
}

$('#gia-mua-ban').on('keyup keydown keypress click change', function (e) {
    var res = $(this).val();
    setCaretToPos($(this)[0], (res.length - 4));
});

$('#gia-mua-ban').keyup(function () {
    var gia = $(this).val();
    if (gia) {
        gia = gia.replace(/,/g, '').replace(' VNĐ', '').trim();
        $(this).val(formatCurrency(gia) + ' VNĐ');

    }
    $('#GiaMuaBan').val(gia);
});

// So km
$('#so-km').keyup(function () {
    var soKM = $(this).val();
    if (soKM) {
        soKM = soKM.replace(/,/g, '').replace(' Km', '').trim();
        $(this).val(formatCurrency(soKM) + ' Km');
    }
    $('#SoKM').val(soKM);

});
$('#so-km').on('keyup keydown keypress click change', function (e) {
    var res = $(this).val();
    setCaretToPos($(this)[0], (res.length - 3));
});

$('#submit-tindang').click(function () {
    var noiDung = $('#NoiDung').val();
    //var checkNoiDung = false;
    //if (noiDung) {
    //    checkNoiDung =  noiDung.split(' ').filter(x => x).length > 49;
    //}
    var loaiTin = $('#LoaiTinDang').val();
    var tieuDe = $('#TieuDe').val();
    var quanHuyenId = $('#QuanHuyenId').val();
    var xaPhuongId = $('#XaPhuongId').val();
    var loaiXe = $('#LoaiXe').val();

    // Bán
    if (loaiTin == 1) {
        var gia = $('#GiaMuaBan').val();
        var imagesCount = 0;
        var imgLst = $('#HinhAnhChiTietThumbnail').val();
        if (imgLst) {
            imagesCount = imgLst.split('|').filter(x => x).length;
        }
        var soKm = $('#SoKM').val();
        var checkSoKm = checkValidSoKm(soKm, loaiXe);
        var checkImg = checkValidImageCount(imagesCount, loaiXe);
        if (noiDung && noiDung.length >= 100
            && tieuDe && tieuDe.length >= 30
            && gia
            && (quanHuyenId && quanHuyenId != 0)
            && (xaPhuongId && xaPhuongId != 0)
            && checkImg
            && checkSoKm) {
            noiDung = noiDung.split('\n').join('<br>').split(' ').join('&nbsp;');
            $('#NoiDung').val(noiDung);
            $('.tindang-form').submit();
        }
        else {
            showWaring(quanHuyenId, "Vui lòng chọn quận huyện!");
            showWaring(xaPhuongId, "Vui lòng chọn xã phường!");
            showWaring(noiDung, "Vui lòng nhập mô tả xe tối thiểu 50 từ!");
            validateTieuDe(tieuDe);
            showWaring(gia, "Vui lòng nhập giá xe!");

            if (loaiXe == "oto") {
                if (imagesCount < 5) {
                    $.notify({
                        message: 'Vui lòng upload tối thiểu 5 hình ảnh chi tiết xe!'
                    }, {
                        type: 'danger'
                    });
                }
                showWaring(soKm, "Vui lòng nhập số km!");
            }
            else if (loaiXe == "xe-may") {
                if (imagesCount < 3) {
                    $.notify({
                        message: 'Vui lòng upload tối thiểu 3 hình ảnh chi tiết xe!'
                    }, {
                        type: 'danger'
                    });
                }
                showWaring(soKm, "Vui lòng nhập số km!");
            }
            else if (loaiXe == 'xe-tai') {
                if (imagesCount < 3) {
                    $.notify({
                        message: 'Vui lòng upload tối thiểu 3 hình ảnh chi tiết xe!'
                    }, {
                        type: 'danger'
                    });
                }
            }
            else if (loaiXe == 'xe-dap') {
                if (imagesCount == 0) {
                    $.notify({
                        message: 'Vui lòng upload tối thiểu 1 hình ảnh chi tiết xe!'
                    }, {
                        type: 'danger'
                    });
                }
            }
        }
    }
    // Mua
    else if (loaiTin == 2) {
        if (noiDung && noiDung.length >= 100
            && tieuDe && tieuDe.length >= 30
            && (quanHuyenId && quanHuyenId != 0)
            && (xaPhuongId && xaPhuongId != 0)) {
            noiDung = noiDung.split('\n').join('<br>').split(' ').join('&nbsp;');
            $('#NoiDung').val(noiDung);
            $('.tindang-form').submit();
        }
        else {
            showWaring(quanHuyenId, "Vui lòng chọn quận huyện!");
            showWaring(xaPhuongId, "Vui lòng chọn xã phường!");
            validateNoiDung(noiDung);
            validateTieuDe(tieuDe);
        }
    }
})

function checkValidSoKm(soKm, loaiXe) {
    if (soKm && soKm != 0 && soKm != 'undefined' && !isNaN(soKm)) {
        if (loaiXe == 'oto' || loaiXe == 'xe-may' || loaiXe == 'xe-tai') {
            return true;
        }
    }
    else {
        if (loaiXe != 'oto' || loaiXe != 'xe-may' || loaiXe != 'xe-tai') {
            return true
        }
    }

    return false;
}

function checkValidImageCount(imgCount, loaiXe) {
    if (loaiXe == 'oto' && imgCount > 4) {
        return true;
    }
    else if ((loaiXe == 'xe-may' || loaiXe == 'xe-tai') && imgCount > 2) {
        return true;
    }
    else if (loaiXe == 'xe-dap' && imgCount > 0) {
        return true;
    }
    return false;
}

$(document).on("change", "select", function () {
    $("option[value='" + this.value + "']", this)
        .attr("selected", true).siblings()
        .removeAttr("selected");
});

// Xe khác 
$(document).on('change', '#LoaiPhuongTienKhacId', function (e) {
    e.preventDefault();
    var id = $(this).val();
    var code = $(this).children("option:selected").attr('data-code');
    $('#LoaiPhuongTienKhac').val(code);
    $('#LoaiPhuongTienKhacConId').empty();
    $('#LoaiPhuongTienKhacConId').append('<option value="">Chọn thông tin</option>');
    $.ajax({
        url: url.GetLoaiXeKhac + '/' + id,
        processData: false,
        async: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            if (res != null && res.length > 0) {
                res.forEach(function (item) {
                    $('#LoaiPhuongTienKhacConId').append(`<option data-name="${item.code}" value="${item.id}">${item.tenDanhMucChiTiet}</option>`);
                });
            }
        }
    });
});

$('#TinhTrangXe').change(function () {
    var tinhTrangXe = $(this).val();
    if (tinhTrangXe == 1) {
        $('.cavet-img').removeAttr('style');
    }
    else {
        $('.cavet-img').attr('style', 'display:none');
    }
})

$('#TieuDe').keyup(function () {
    var tieuDe = $(this).val();
    if (tieuDe) {
        var countText = tieuDe.length;
        if (countText > 85) {
            $(this).val(mota.substring(0, 85));
        }
    }
});

function validateTieuDe(tieuDe) {
    if (tieuDe) {
        if (tieuDe.length < 30) {
            $.notify({
                message: 'Vui lòng nhập thêm tiêu đề, tối thiểu 30 kí tự!'
            }, {
                type: 'danger'
            });
        }
        return;
    }
    else {
        $.notify({
            message: 'Vui lòng nhập tiêu đề!'
        }, {
            type: 'danger'
        });
    }
}

$('#NoiDung').keyup(function () {
    var mota = $(this).val();
    if (mota) {
        var countText = mota.length;
        if (countText > 800) {
            $(this).val(mota.substring(0, 800));
        }
    }
});

function validateNoiDung(noiDung) {
    if (noiDung) {
        if (noiDung.length < 100) {
            $.notify({
                message: 'Vui lòng nhập thêm mô tả, tối thiểu 100 kí tự!'
            }, {
                type: 'danger'
            });
        }
        return;
    }
    else {
        $.notify({
            message: 'Vui lòng nhập mô tả!'
        }, {
            type: 'danger'
        });
    }
}

$('#TinhTrangXe').change(function () {
    var tinhTrangXe = $(this).val();
    var loaiXe = $('#LoaiXe').val();
    $('#HinhAnhCavet').val(null);
    if (loaiXe == 'oto' || loaiXe == 'xe-may' || loaiXe == 'xe-tai') {
        // Xe cũ
        if (tinhTrangXe == 1) {
            $('.cavet-img').append(`<span>Hình ảnh cavet xe</span><div class="form-upload-snews w-100 float-left"><div class="box" id="Dropzone-ImgCarCavet" style="height:150px;"><div class="upload previews1" id="gallery"><label onclick="openDialogFile()"><figure><img src="../assets/images/icon/ic-add-img.png"></figure><p class="mb-0">Chọn ảnh hoặc kéo thả ảnh vào đây</p></label>'
                </div ></div ><div class="preview-gallery"><ul class="list-unstyled cavet-img-container"></ul></div></div >`);
            initCavetImage();
        }
        else if (tinhTrangXe == 2) {
            $('.cavet-img').empty();
        }
    }
});