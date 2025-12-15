
// Select tỉnh thành
$('#tinhthanh-select-quicksearch').change(function () {
    var tinhThanh = $('#tinhthanh-select-quicksearch').val();
    var originUrl = window.location.origin;
    var url = originUrl + "/" + tinhThanh + "/mua-ban-xe";
    // redirect
    window.location.href = url;
});

$('#xt-loaixe').change(function () {
    var loaiXe = $(this).val();
    $("#ParamRequest_DanhMuc").val(loaiXe).trigger('change');
});

// Select loại xe
$('#loaixe-select-quicksearch').change(function () {
    var loaiXe = $('#loaixe-select-quicksearch').val();
    var tinhThanh = 'toan-quoc';
    var originUrl = window.location.origin;
    var url = originUrl + "/" + tinhThanh + "/mua-ban-" + loaiXe;
    // redirect
    window.location.href = url;
});


// Search button
$('#btn-ap-dung > button').click(function () {
    searchFull();
});

function searchFull() {
    var url = window.location.origin;
    var tinhThanh = $("select[name='ParamRequest.TinhThanh']").val();
    var keyword = $("input[name='ParamRequest.Keyword']").val();
    var loaiXe = $("select[name='ParamRequest.LoaiXe']").val();
    var hangXeCode = $('#hang-xe-code').val();
    var dongXeCode = $('#dong-xe-code').val();
    var tinhTrangXe = $('#tinh-trang').val();
    var sapXepTheo = $('input[name="sap-xep-theo"]:checked').val();
    var gia = null;
    var giaTu = $('#slider-range1').slider("values")[0];
    var giaDen = $('#slider-range1').slider("values")[1];
    if (giaTu != 0 || giaDen != 1500000000) {
        gia = giaTu + '-' + giaDen;
    }
    var isCaNhan = $('#type-professional:checked').val();
    var isBanChuyen = $('#type-half:checked').val();
    var isMua = $('#type-shop2:checked').val();
    var isBan = $('#type-professional2:checked').val();

    if (tinhThanh) {
        url += '/' + tinhThanh;
    }

    if (loaiXe) {
        url += '/' + 'mua-ban-' + loaiXe;
        if (loaiXe === 'xe-khac') {
            var loaiXeChuyenDung = $('#loai-xe-chuyen-dung-code').val();
            if (loaiXeChuyenDung && loaiXeChuyenDung != 'undefined') {
                url += '/' + loaiXeChuyenDung;
                var loaiXeChuyenDungCon = $('#loai-xe-chuyen-dung-con-code').val();
                if (loaiXeChuyenDungCon && loaiXeChuyenDungCon != 'undefined') {
                    url += '--' + loaiXeChuyenDungCon;
                }
            }
        }
        else if (loaiXe === 'phu-kien') {
            var loaiPhuTung = $('#loai-phu-tung-code').val();
            if (loaiPhuTung) {
                url += '/' + loaiPhuTung;
            }
        }
        else {
            if (hangXeCode) {
                url += '/' + hangXeCode;
                if (dongXeCode) {
                    url += '--' + dongXeCode;
                }
            }
        }
    }
    else {
        url += '/' + 'mua-ban-xe';
    }

    if (tinhTrangXe) {
        url += '/' + tinhTrangXe;
    }

    url = appendUrl(keyword, url, 'q');
    url = appendUrl(gia, url, 'p');
    url = appendUrl(sapXepTheo, url, 's');

    // Đăng bởi
    if (isCaNhan && !isBanChuyen) {
        if (url.includes('?')) {
            url += '&po=' + isCaNhan;
        }
        else {
            url += '?po=' + isBanChuyen;
        }
    }
    else if (!isCaNhan && isBanChuyen) {
        if (url.includes('?')) {
            url += '&po=' + isBanChuyen;
        }
        else {
            url += '?po=' + isBanChuyen;
        }
    }

    // Loại tin
    if (isBan && !isMua) {
        if (url.includes('?')) {
            url += '&st=2';
        }
        else {
            url += '?st=2';
        }
    }
    else if (!isBan && isMua) {
        if (url.includes('?')) {
            url += '&st=1';
        }
        else {
            url += '?st=1';
        }
    }

    if (loaiXe == 'oto') {
        var soKm = $("#slider-range4").slider("values")[0] + '-' + $("#slider-range4").slider("values")[1];
        var namSX = $("#slider-range3").slider("values")[0] + '-' + $("#slider-range3").slider("values")[1];
        var mauSac = $('#mau-sac').val();
        var xuatXu = $('#xuat-xu').val();
        var dangXe = $('#dang-xe').val();
        var hopSo = $('#hop-so').val();
        var nhienLieu = $('#nhien-lieu').val();
        var soChoNgoi = $('#so-cho').val();
        url = appendUrl(soKm, url, 'k');
        url = appendUrl(namSX, url, 'y');
        url = appendUrl(mauSac, url, 'c');
        url = appendUrl(xuatXu, url, 'fr');
        url = appendUrl(dangXe, url, 'm');
        url = appendUrl(hopSo, url, 'g');
        url = appendUrl(nhienLieu, url, 'f');
        url = appendUrl(soChoNgoi, url, 'ns');
    }
    else if (loaiXe == 'xe-may') {
        var soKm = $("#slider-range4").slider("values")[0] + '-' + $("#slider-range4").slider("values")[1];
        var namSX = $("#slider-range3").slider("values")[0] + '-' + $("#slider-range3").slider("values")[1];
        var loaiXeMay = $('#loai-xe-may').val();
        var dungTich = $('#dung-tich').val();
        url = appendUrl(soKm, url, 'k');
        url = appendUrl(namSX, url, 'y');
        url = appendUrl(loaiXeMay, url, 'm');
        url = appendUrl(dungTich, url, 'cp');
    }
    else if (loaiXe === 'xe-tai') {
        var soKm = $("#slider-range4").slider("values")[0] + '-' + $("#slider-range4").slider("values")[1];
        var namSX = $("#slider-range3").slider("values")[0] + '-' + $("#slider-range3").slider("values")[1];
        var mauSac = $('#mau-sac').val();
        var xuatXu = $('#xuat-xu').val();
        var nhienLieu = $('#nhien-lieu').val();
        var taiTrong = $('#tai-trong').val();
        url = appendUrl(soKm, url, 'k');
        url = appendUrl(namSX, url, 'y');
        url = appendUrl(mauSac, url, 'c');
        url = appendUrl(xuatXu, url, 'fr');
        url = appendUrl(nhienLieu, url, 'f');
        url = appendUrl(taiTrong, url, 'w');
    }
    else if (loaiXe === 'xe-dien') {
        var loaiXeDien = $('#loai-xe-dien').val();
        var mauSac = $('#mau-sac').val();
        var xuatXu = $('#xuat-xu').val();
        var dongCo = $('#dong-co').val();
        var baoHanh = $('#bao-hanh').val();
        url = appendUrl(loaiXeDien, url, 'm');
        url = appendUrl(mauSac, url, 'c');
        url = appendUrl(xuatXu, url, 'fr');
        url = appendUrl(dongCo, url, 'e');
        url = appendUrl(baoHanh, url, 'wp');
    }
    else if (loaiXe === 'xe-dap') {
        var loaiXeDap = $('#loai-xe-dap').val();
        var mauSac = $('#mau-sac').val();
        var xuatXu = $('#xuat-xu').val();
        var kichThuocKhung = $('#kich-thuoc-khung').val();
        var chatLieuKhung = $('#chat-lieu-khung').val();
        var baoHanh = $('#bao-hanh').val();
        url = appendUrl(loaiXeDap, url, 'm');
        url = appendUrl(mauSac, url, 'c');
        url = appendUrl(xuatXu, url, 'fr');
        url = appendUrl(kichThuocKhung, url, 'kk');
        url = appendUrl(chatLieuKhung, url, 'ck');
        url = appendUrl(baoHanh, url, 'wp');
    }
    
    
    window.location.href = url;
}

function appendUrl(value, url, param) {
    if (value && value != 0) {
        if (url.includes('?')) {
            url += `&${param}=${value}`;
        }
        else {
            url += `?${param}=${value}`;
        }
    }

    return url;
}

$('#search-car').click(function () {
    searchPartial();
});

// Search enter event
$("input[name='ParamRequest.q']").keypress(function (event) {
    var keyword = $(this).val();
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13' && keyword) {
        searchPartial();
    }
});

function searchPartial() {
    var url = window.location.origin;
    var keyword = $("input[name='ParamRequest.q']").val();
    var tinhThanh = $("select[name='ParamRequest.TinhThanh']").val();
    var loaiXe = $("select[name='ParamRequest.LoaiXe']").val();
    url += '/' + tinhThanh;
    if (loaiXe) {
        url += '/mua-ban-' + loaiXe;
    }
    else {
        url += '/mua-ban-xe';
    }
    if (keyword) {
        url += '?q=' + keyword.trim();
    }
    window.location.href = url;
}