$(document).ready(function () {
    if (loaiXe == 'xe-may' || loaiXe == 'oto' || loaiXe == 'xe-tai') {
        var phiLanBanh = formatCurrency(PhiLanBanh);
        $('#phi-lan-banh > b').append(`${phiLanBanh} ₫ <img alt="ic-arrow-right.svg" src="/../assets/images/icon/ic-arrow-right.svg" class="ml-1">`);
    }
    $('#tra-gop > b').append(`${formatCurrency(SoTienHangThang)} đồng/tháng <img alt="ic-arrow-right.svg" src="/../assets/images/icon/ic-arrow-right.svg" class="ml-1">`);
});

$('#phi-lan-banh').click(function () {
    var id = $(this).attr('data-id');
    $.ajax({
        url: urls.PhiLanBanh + '/' + id,
        processData: false,
        async: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            $('#gia-niem-yet').val(formatCurrency(String(res.giaNiemYet)));
            $('#phi-duong-bo').val(formatCurrency(String(res.phiDuongBo)));
            $('#phi-dang-kiem').val(formatCurrency(String(res.phiDangKiem)));
            $('#phi-truoc-ba').text(formatCurrency(String(res.phiTruocBa)));
            $('#phi-dang-ki').text(formatCurrency(String(res.phiDangKy)));
            $('#phi-total').text(formatCurrency(String(res.total)) + ' đồng');
        }
    });

    appendPhiTruocBaTinhThanh();
    appendPhiDangKyTinhThanh();

    $.fancybox.open({
        src: '#popup-chiphi',
        type: 'inline',
        touch: false,
        opts: {
            afterShow: function (instance, current) {
                // console.info( 'done!' );
            }
        }
    });
});

function appendPhiTruocBaTinhThanh() {
    $('#truoc-ba-tinh-thanh').empty();
    $.ajax({
        url: urls.GetTinhThanh + '/phi-truoc-ba/' + loaiXe,
        processData: false,
        async: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var newTinhThanhCode = "";
            if (TinhThanhCode == 'ha-noi') {
                newTinhThanhCode = TinhThanhCode;
            }
            else {
                newTinhThanhCode = 'tinh-thanh-khac';
            }
            for (item of res) {
                if (item.tinhThanhCode == newTinhThanhCode) {
                    $('#truoc-ba-tinh-thanh').append(`<option selected value="${item.phi}">${item.tenTinhThanh} - ${parseFloat(item.phi) * 100}%</option>`);
                }
                else {
                    $('#truoc-ba-tinh-thanh').append(`<option value="${item.phi}">${item.tenTinhThanh} - ${parseFloat(item.phi) * 100}%</option>`);
                }
            }
        }
    });
}

function appendPhiDangKyTinhThanh() {
    $('#dang-ky-tinh-thanh').empty();
    $.ajax({
        url: urls.GetTinhThanh + '/phi-dang-ky/' + loaiXe,
        processData: false,
        async: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var newTinhThanhCode = "";
            if (TinhThanhCode == 'ha-noi' || TinhThanhCode == 'ho-chi-minh') {
                newTinhThanhCode = 'ha-noi|ho-chi-minh';
            }
            else {
                newTinhThanhCode = 'tinh-thanh-khac';
            }
            $('#dang-ky-tinh-thanh').val(newTinhThanhCode);
            for (item of res) {
                if (item.tinhThanhCode == newTinhThanhCode) {
                    $('#dang-ky-tinh-thanh').append(`<option selected value="${item.phi}">${item.tenTinhThanh}</option>`);
                }
                else {
                    $('#dang-ky-tinh-thanh').append(`<option value="${item.phi}">${item.tenTinhThanh}</option>`);
                }
            }
        }
    });
}

$('#truoc-ba-tinh-thanh').change(function () {
    var newVal = parseFloat($(this).val());
    var oldVal = parseFloat($('#PhiLanBanh_PhiTruocBa').val());
    var total = parseFloat($('#PhiLanBanh_Total').val());
    var giaNiemYet = parseFloat($('#PhiLanBanh_GiaNiemYet').val());
    var newPhiTruocBa = giaNiemYet * newVal;
    var newTotal = total - oldVal + newPhiTruocBa;
    $('#phi-total').empty();
    $('#phi-total').text(formatCurrency(String(newTotal)) + ' đồng');
    $('#phi-truoc-ba').empty();
    $('#phi-truoc-ba').text(formatCurrency(String(newPhiTruocBa)));
    // Set new value
    $('#PhiLanBanh_PhiTruocBa').val(newPhiTruocBa);
    $('#PhiLanBanh_Total').val(newTotal)
});

$('#dang-ky-tinh-thanh').change(function () {
    var newVal = parseFloat($(this).val());
    var oldVal = parseFloat($('#PhiLanBanh_PhiDangKy').val());
    var total = parseFloat($('#PhiLanBanh_Total').val());
    var newTotal = total - oldVal + newVal;
    $('#phi-total').empty();
    $('#phi-total').text(formatCurrency(String(newTotal)) + ' đồng');
    $('#phi-dang-ki').empty();
    $('#phi-dang-ki').text(formatCurrency(String(newVal)));
    $('#PhiLanBanh_PhiDangKy').val(newVal);
});

// Số tiền trả góp hàng tháng
$('#tra-gop').click(function () {
    $('#so-tien-total').empty();
    $('#so-tien-total').append(formatCurrency(SoTienHangThang) + ' vnđ/tháng');
    var phanTram = parseInt($('#phan-tram-tra-gop').val());
    var tienTuongUng = (parseFloat(GiaXe) * phanTram / 100).toFixed(0);
    $('#tien-tuong-ung').empty();
    $('#tien-tuong-ung').text(formatCurrency(String(tienTuongUng)));
    $('#gia-xe').val(formatCurrency(String(GiaXe.replace('.00', ''))));
    $.ajax({
        url: urls.GetNganHang,
        processData: false,
        async: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            $('#ngan-hang-info > label').text(`Gói vay hiện tại của ngân hàng ${res.nganHangList[0].tenNganHang}`);
            $('#lai-suat').val(parseFloat(res.nganHangList[0].laiSuatNam) * 100);
            $('#ngan-hang-info > ul').empty();
            for (var i = 0; i < res.nganHangList.length; i++) {
                if (i == 0) {
                    $('#ngan-hang-info > ul').append(`<li class="active" data-id="${res.nganHangList[i].id}" data-laisuat="${res.nganHangList[i].laiSuatNam}" data-ten="${res.nganHangList[i].tenNganHang}"><img src="/../assets/images/cost/${res.nganHangList[i].icon}"></li>`);
                }
                else {
                    $('#ngan-hang-info > ul').append(`<li data-id="${res.nganHangList[i].id}" data-laisuat="${res.nganHangList[i].laiSuatNam}" data-ten="${res.nganHangList[i].tenNganHang}"><img src="/../assets/images/cost/${res.nganHangList[i].icon}"></li>`);
                }
            }
        }
    });

    $.fancybox.open({
        src: '#popup-cost',
        type: 'inline',
        touch: false,
        opts: {
            afterShow: function (instance, current) {
                // console.info( 'done!' );
            }
        }
    });
});


$(document).on('click', '#ngan-hang-info > ul > li', function (e) {
    e.preventDefault();
    var laiSuat = $(this).attr('data-laisuat');
    var ten = $(this).attr('data-ten');
    $('#ngan-hang-info > label').empty();
    $('#ngan-hang-info > label').text(`Gói vay hiện tại của ngân hàng ${ten}`);
    $('#lai-suat').val(parseFloat(laiSuat) * 100);
    if ($('#ngan-hang-info > ul > li').hasClass('active')) {
        $('#ngan-hang-info > ul > li').removeClass('active');
    }
    $(this).addClass('active');
    tinhTienTraHangThang();
});

function tinhTienTraHangThang() {
    var laiSuat = parseFloat($('#lai-suat').val()) / 100;
    var soNam = parseInt($('.car-per-year > ul > .active').text());
    var phanTram = 100 - parseInt($('#phan-tram-tra-gop').val());
    var soTienTraGop = parseFloat(GiaXe) * (phanTram / 100);
    // Tiền gốc + tiền lãi
    var soTien = (soTienTraGop / (soNam * 12)) + ((soTienTraGop * laiSuat) / 12) ;
    $('#so-tien-total').empty();
    $('#so-tien-total').append(formatCurrency(String(soTien.toFixed(0))) + ' vnđ/tháng');
}

$('#phan-tram-tra-gop').change(function () {
    var phanTram = parseInt($(this).val());
    var soTien = parseFloat(GiaXe) * phanTram / 100;
    tinhTienTraHangThang();
    $('#tien-tuong-ung').empty();
    $('#tien-tuong-ung').text(formatCurrency(String(soTien)));
});

$('.car-per-year > ul > li').click(function (e) {
    e.preventDefault();
    $('.car-per-year > ul > .active').removeClass('active');
    $(this).addClass('active');
    tinhTienTraHangThang();
});

// Liên hệ trả góp
$('#lien-he-tra-gop-btn').click(function () {
    var nganHangId = $('#ngan-hang-info > ul > .active').attr('data-id');
    $.ajax({
        url: urls.GetNganHangById + '/' + nganHangId,
        processData: false,
        async: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            $('#bank-icon').empty();
            $('#bank-icon').append(`<img src="/../assets/images/cost/${res.icon}">`);
            $('input[name="NganHangId"]').val(res.id);
        }
    });
    $.fancybox.close();
    $.fancybox.open({
        src: '#popup-info',
        type: 'inline',
        touch: false,
        opts: {
            afterShow: function (instance, current) {
                // console.info( 'done!' );
            }
        }
    });
});

$('.back-button').click(function () {
    $.fancybox.close();
    $.fancybox.open({
        src: '#popup-cost',
        type: 'inline',
        touch: false,
        opts: {
            afterShow: function (instance, current) {
                // console.info( 'done!' );
            }
        }
    });
});

// Submit form
$('#submit-form-tra-gop').click(function () {
    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: urls.LienHeTraGop,
            type: 'POST',
            data: $('form').serialize(),
            success: function () {
                $.fancybox.close();
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
        });
    });
});

// Place this code in the head section of your HTML file
// Skype
(function (r, d, s) {
    r.loadSkypeWebSdkAsync = r.loadSkypeWebSdkAsync || function (p) {
        var js, sjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(p.id)) { return; }
        js = d.createElement(s);
        js.id = p.id;
        js.src = p.scriptToLoad;
        js.onload = p.callback
        sjs.parentNode.insertBefore(js, sjs);
    };
    var p = {
        scriptToLoad: 'https://swx.cdn.skype.com/shared/v/latest/skypewebsdk.js',
        id: 'skype_web_sdk'
    };
    r.loadSkypeWebSdkAsync(p);
})(window, document, 'script');

// Facebook
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Zoom images

function openPhotoSwipe(imgIndex) {
    var pswpElement = document.querySelectorAll('.pswp')[0];
    // build items array
    var items = initNewImages();

    // define options (if needed)
    var options = {
        // history & focus options are disabled on CodePen
        index: parseInt(imgIndex),
        history: false,
        focus: false,

        showAnimationDuration: 0,
        hideAnimationDuration: 0

    };

    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.listen('gettingData', function (index, item) {
        if (item.w < 1 || item.h < 1) { // unknown size
            var img = new Image();
            img.onload = function () { // will get size after load
                item.w = this.width; // set image width
                item.h = this.height; // set image height
                gallery.invalidateCurrItems(); // reinit Items
                gallery.updateSize(true); // reinit Items
            }
            img.src = item.src; // let's download image
        }
    });
    gallery.init();
};
$('.zoom-img').click(function () {
    var imgIndex = $(this).attr('data-img-index');
    openPhotoSwipe(imgIndex);
})
function initNewImages() {

    var cars = [];
    for (var item of HinhAnhArr) {
        console.log(item);
        var newObj = {
            src: '/../uploads/tindang/' + item,
            w: 0,
            h: 0
        }
        cars.push(newObj);
    }
    return cars;
}