var isTag = null;
if ($("#ParamRequest_TagCode").val()) {
    isTag = true;
}
$('#nguoidang-select-quicksearch').change(function () {
    var tagCode = $('#ParamRequest_TagCode').val();
    var nguoiDang = $(this).val();
    var url = "";
    if (tagCode && tagCode != 'undefined') {
        var loaiDanhMuc = $("input[name='ParamRequest.LoaiDanhMuc']").val();
        url = initTagUrl(loaiDanhMuc, null);
        url += '?po=' + nguoiDang;
    }
    else {
        url = window.location.href;
        if (nguoiDang) {
            if (url.includes('po')) {
                url = removeParam('po', url);
                if (url.includes('?')) {
                    url += '&po=' + nguoiDang;
                }
                else {
                    url += '?po=' + nguoiDang;
                }
            }
            else {
                if (url.includes('?')) {
                    url += '&po=' + nguoiDang;
                }
                else {
                    url += '?po=' + nguoiDang;
                }
            }
        }
        // remove param
        else {
            url = removeParam('po', url);
        }
    }
    window.location.href = url;
});

$('#sapxeptheo-select-quicksearch').change(function () {
    var tagCode = $('#ParamRequest_TagCode').val();
    var sapXepTheo = $(this).val();
    var url = "";
    if (tagCode) {
        var loaiDanhMuc = $("input[name='ParamRequest.LoaiDanhMuc']").val();
        url = initTagUrl(loaiDanhMuc, null);
        url += '?s=' + sapXepTheo;
    }
    else {
        url = window.location.href;
        if (sapXepTheo) {
            if (url.includes('s=')) {
                url = removeParam('s', url);
                if (url.includes('?')) {
                    url += '&s=' + sapXepTheo;
                }
                else {
                    url += '?s=' + sapXepTheo;
                }
            }
            else {
                if (url.includes('?')) {
                    url += '&s=' + sapXepTheo;
                }
                else {
                    url += '?s=' + sapXepTheo;
                }
            }
        }
        // remove param
        else {
            removeParam('s', url);
        }
    }

    window.location.href = url;
});

$('#xt-loaixe').change(function () {
    appentFilterContent();
    // Tag page
    if (isTag) {
        var diaChi = $("select[name='ParamRequest.DiaChi']").val();
        var url = window.location.origin + '/' + diaChi;
        var loaiXe = $(this).val();
        if (loaiXe) {
            url += '/mua-ban-' + loaiXe;
        }
        else {
            url += '/mua-ban-xe';
        }

        window.location.href = url;
    }
    // search page
    else {
        var loaiXe = $(this).val();
        $("#ParamRequest_DanhMuc").val(loaiXe).trigger('change');
        var url = window.location.pathname;
        var paramList = url.split('/');
        if (paramList[2].includes('mua-ban')) {
            if (loaiXe) {
                url = paramList[1] + '/' + 'mua-ban-' + loaiXe;
            }
            else {
                url = paramList[1] + '/' + 'mua-ban-xe';
            }
        }
        else {
            if (loaiXe) {
                url = paramList[1] + '/' + paramList[2] + '/' + 'mua-ban-' + loaiXe;
            }
            else {
                url = paramList[1] + '/' + paramList[2] + '/' + 'mua-ban-xe';
            }
        }
        window.location.href = window.location.origin + '/' + url;
    }
});

$("select[name='ParamRequest.DiaChi']").change(function () {
    // Tag page
    if (isTag) {
        var loaiXe = $("input[name='ParamRequest.LoaiXe']").val();
        var hangXe = $("input[name='ParamRequest.HangXe']").val();
        var dongXe = $("input[name='ParamRequest.DongXe']").val();
        var namSX = $("input[name='ParamRequest.NamSX']").val();
        var diaChi = $(this).val();
        if (diaChi) {
            var url = window.location.origin + '/' + diaChi;
            if (loaiXe) {
                url += '/' + 'mua-ban-' + loaiXe;
                if (hangXe) {
                    url += '/' + hangXe;
                    if (dongXe) {
                        url += '--' + dongXe;
                        if (namSX) {
                            url += '--' + namSX;
                        }
                    }
                }
            }
            else {
                url += '/mua-ban-xe';
            }
            window.location.href = url;
        }
    }
    // search page
    else {
        var url = window.location.pathname;
        var paramList = url.split('/');
        var diaChi = $("select[name='ParamRequest.DiaChi']").val();
        var loaiDiaChi = $("input[name='ParamRequest.LoaiDiaChi']").val();
        if (loaiDiaChi == "TinhThanh") {
            if (diaChi) {
                url = url.replace(paramList[1], diaChi);
            }
            else {
                url = url.replace(paramList[1] + '/', '');
            }
        }
        else if (loaiDiaChi == "QuanHuyen") {
            var hasQuanHuyen = $("input[name='ParamRequest.HasQuanHuyen']").val();
            if (hasQuanHuyen == 'True') {
                if (diaChi) {
                    paramList[2] = diaChi;
                    url = paramList.join('/');
                }
                else {
                    paramList.splice(2, 1);
                    url = paramList.join('/');
                }
            }
            else {
                url = url.replace(paramList[1], paramList[1] + '/' + diaChi);
            }
        }

        window.location.href = window.location.origin + url;
    }
});

$('#loaixe-select-quicksearch').change(function () {
    setUrl();
});

// Search button
$('.btn-search').click(function () {
    searchFull();
});

function setUrl() {
    //search/{TinhThanh}/{loaiTin}/{TinhTrangXe}/{LoaiXe}/{Gia}/{SapXepTheo}/{DangBoi}/{Keyword}
    var originUrl = window.location.origin;
    var tinhThanh = $("select[name='ParamRequest.DiaChi']").val();
    //var tinhTrangXe = $('#tinhtrangxe-select-quicksearch').val();
    var loaiXe = $("select[name='ParamRequest.DanhMuc']").val();
    var giaTu = $("#slider-range").slider("values", 0);
    var giaDen = $("#slider-range").slider("values", 1);
    var gia = null;
    if (giaTu != 0 && giaDen != 1500000000) {
        gia = giaTu + '-' + giaDen; 
    }
    var sapXepTheo = $('input[name="customRadioInline1"]:checked').val();
    var dangBoi = "";
    var isCuaHang = $('#type-shop:checked').val();
    var isCaNhan = $('#type-professional:checked').val();
    var isBanChuyen = $('#type-half:checked').val();
    if (isCuaHang) {
        dangBoi += "cuaHang"
    }
    if (isCaNhan) {
        if (dangBoi) {
            dangBoi += ",caNhan"
        }
        else {
            dangBoi += "caNhan"
        }
    }
    if (isBanChuyen) {
        if (dangBoi) {
            dangBoi += ",banChuyen"
        }
        else {
            dangBoi += "banChuyen"
        }
    }

    if (dangBoi == null || dangBoi == "") {
        dangBoi = "-";
    }
    var keyword = $("input[name='ParamRequest.Keyword']").val();
    var loaiTin = "mua-ban-xe";
    if (keyword == null || keyword == "") {
        keyword = '-';
    }
    var url = `/${tinhThanh}/${loaiXe}/${loaiTin}/${keyword}/`;
    if (gia != null) {
        url += `${gia}/${sapXepTheo}/${dangBoi}`;
    }
    else {
        url += `${sapXepTheo}/${dangBoi}`;
    }
    window.open(originUrl + url);
}

$('.loai-xe-tin-dang').click(function (e) {
    e.preventDefault();
    var paramList = window.location.pathname.split('/');
    var url = window.location.href;
    var danhMuc = $(this).attr("data-code");
    var loaiDanhMuc = $("input[name='ParamRequest.LoaiDanhMuc']").val();
    var diaChi = $("select[name='ParamRequest.DiaChi']").val();
    var loaiDiaChi = $("input[name='ParamRequest.LoaiDiaChi']").val();
    var tagCode = $('#ParamRequest_TagCode').val();

    if (tagCode) {
        url = initTagUrl(loaiDanhMuc, danhMuc);
    }
    // Trang search
    else {
        // Chỉ có tỉnh thành, không có quận huyện
        // tp-ho-chi-minh/mua-ban-oto/bwm
        if (loaiDiaChi == "TinhThanh") {
            if (diaChi) {
                url = url.replace(paramList[1], diaChi);
            }

            // Danh mục loại xe
            // tp-ho-chi-minh/mua-ban-oto
            if (loaiDanhMuc == "LoaiXe") {
                url = url.replace(paramList[2], `mua-ban-${danhMuc}`);
            }

            // Danh mục hãng xe
            else if (loaiDanhMuc == "HangXe") {
                var hasHangXe = $("input[name='ParamRequest.HasHangXe']").val();

                // tp-ho-chi-minh/mua-ban-oto/bwm
                if (hasHangXe == 'True') {
                    var currentDanhMuc = paramList[3];
                    var danhMucList = currentDanhMuc.split('--');
                    //Replace hãng xe
                    currentDanhMuc = currentDanhMuc.replace(danhMucList[0], danhMuc);
                    url = url.replace(paramList[3], currentDanhMuc);
                }
                // tp-ho-chi-minh/mua-ban-oto
                else {
                    url = url.replace(paramList[2], paramList[2] + '/' + danhMuc);
                }
            }

            // Danh mục dòng xe
            else if (loaiDanhMuc == "DongXe") {
                var hasDongXe = $("input[name='ParamRequest.HasDongXe']").val();
                var currentDanhMuc = paramList[3];
                var danhMucList = currentDanhMuc.split('--');

                // tp-ho-chi-minh/mua-ban-oto/bwm--i320
                if (hasDongXe == 'True') {
                    //Replace dòng xe
                    currentDanhMuc = currentDanhMuc.replace(danhMucList[1], danhMuc);
                    url = url.replace(paramList[3], currentDanhMuc);
                }
                else {
                    // /toan-quoc/mua-ban-oto/bmw
                    currentDanhMuc += '--' + danhMuc;
                    url = url.replace(paramList[3], currentDanhMuc);
                }
            }

            // Danh mục năm sản xuất
            else if (loaiDanhMuc == "NamSX") {
                var hasNamSx = $("input[name='ParamRequest.HasNamSX']").val();
                var currentDanhMuc = paramList[3];
                var danhMucList = currentDanhMuc.split('--');
                // /toan-quoc/mua-ban-oto/bmw--i320--2019
                if (hasNamSx == 'True') {
                    //Replace nam sx
                    currentDanhMuc = currentDanhMuc.replace(danhMucList[2], danhMuc);
                    url = url.replace(paramList[3], currentDanhMuc);
                }
                // /toan-quoc/mua-ban-oto/bmw--i320
                else {
                    currentDanhMuc += '--' + danhMuc;
                    url = url.replace(paramList[3], currentDanhMuc);
                }
            }

            // Loại xe khác
            else if (loaiDanhMuc == "PhuongTienKhac") {
                var hasPhuongTienKhac = $("input[name='ParamRequest.HasPhuongTienKhac']").val();

                // tp-ho-chi-minh/mua-ban-xe-khac/xe-chuyen-dung
                if (hasPhuongTienKhac == 'True') {
                    var currentDanhMuc = paramList[3];
                    var danhMucList = currentDanhMuc.split('--');
                    //Replace loại phương tiện khác
                    currentDanhMuc = currentDanhMuc.replace(danhMucList[0], danhMuc);
                    url = url.replace('/' + paramList[3], '/' + currentDanhMuc);
                }
                // tp-ho-chi-minh/mua-ban-oto
                else {
                    url = url.replace(paramList[2], paramList[2] + '/' + danhMuc);
                }
            }
            // Danh mục dòng xe
            else if (loaiDanhMuc == "PhuongTienKhacCon") {
                var hasPhuongTienKhacCon = $("input[name='ParamRequest.HasPhuongTenKhacCon']").val();
                var currentDanhMuc = paramList[3];
                var danhMucList = currentDanhMuc.split('--');

                // tp-ho-chi-minh/mua-ban-oto/bwm--i320
                if (hasPhuongTienKhacCon == 'True') {
                    //Replace dòng xe
                    currentDanhMuc = currentDanhMuc.replace(danhMucList[1], danhMuc);
                    url = url.replace(paramList[3], currentDanhMuc);
                }
                else {
                    // /toan-quoc/mua-ban-oto/bmw
                    currentDanhMuc += '--' + danhMuc;
                    url = url.replace(paramList[3], currentDanhMuc);
                }
            }
            // Phụ tùng xe
            else if (loaiDanhMuc == "PhuTungXe") {
                var hasPhuTung = $("input[name='ParamRequest.HasPhuTung']").val();

                // tp-ho-chi-minh/mua-ban-oto/bwm
                if (hasPhuTung == 'True') {
                    var currentDanhMuc = paramList[3];
                    var danhMucList = currentDanhMuc.split('--');
                    //Replace hãng xe
                    currentDanhMuc = currentDanhMuc.replace(danhMucList[0], danhMuc);
                    url = url.replace(paramList[3], currentDanhMuc);
                }
                // tp-ho-chi-minh/mua-ban-oto
                else {
                    url = url.replace(paramList[2], paramList[2] + '/' + danhMuc);
                }
            }
        }

        // Có quận huyện
        else if (loaiDiaChi == "QuanHuyen") {
            var hasQuanHuyen = $("input[name='ParamRequest.HasQuanHuyen']").val();
            if (hasQuanHuyen == "True") {
                // Replace 
                //url = url.replace(paramList[2], diaChi);

                // Danh mục loai xe
                // tp-ho-chi-minh/quan-1/mua-ban-oto
                if (loaiDanhMuc == "LoaiXe") {
                    url = url.replace(paramList[3], `mua-ban-${danhMuc}`);
                }

                // Danh muc hang xe
                else if (loaiDanhMuc == "HangXe") {
                    var hasHangXe = $("input[name='ParamRequest.HasHangXe']").val();

                    // tp-ho-chi-minh/quan-1/mua-ban-oto/bwm
                    if (hasHangXe == 'True') {
                        var currentDanhMuc = paramList[4];
                        var danhMucList = currentDanhMuc.split('--');
                        //Replace hãng xe
                        currentDanhMuc = currentDanhMuc.replace(danhMucList[0], danhMuc);
                        url = url.replace(paramList[4], currentDanhMuc);
                    }
                    // tp-ho-chi-minh/quan-1/mua-ban-oto
                    else {
                        url = url.replace(paramList[3], paramList[3] + '/' + danhMuc);
                    }
                }
                // Danh mục dòng xe
                else if (loaiDanhMuc == "DongXe") {
                    var hasDongXe = $("input[name='ParamRequest.HasDongXe']").val();
                    var currentDanhMuc = paramList[4];
                    var danhMucList = currentDanhMuc.split('--');
                    // tp-ho-chi-minh/quan-1/mua-ban-oto/bwm--i320
                    if (hasDongXe == 'True') {
                        //Replace nam sx
                        currentDanhMuc = currentDanhMuc.replace(danhMucList[1], danhMuc);
                        url = url.replace(paramList[4], currentDanhMuc);
                    }
                    // tp-ho-chi-minh/quan-1/mua-ban-oto/bwm
                    else {
                        url = url.replace(paramList[4], paramList[4] + '--' + danhMuc);
                    }
                }
                // Danh mục năm sx
                else if (loaiDanhMuc == "NamSX") {
                    var hasNamSx = $("input[name='ParamRequest.HasNamSX']").val();
                    var currentDanhMuc = paramList[4];
                    var danhMucList = currentDanhMuc.split('--');
                    // tp-ho-chi-minh/quan-1/mua-ban-oto/bwm--i320--2019
                    if (hasNamSx == 'True') {
                        //Replace nam sx
                        currentDanhMuc = currentDanhMuc.replace(danhMucList[2], danhMuc);
                        url = url.replace(paramList[4], currentDanhMuc);
                    }
                    // tp-ho-chi-minh/quan-1/mua-ban-oto/bwm--i320
                    else {
                        url = url.replace(paramList[4], paramList[4] + '--' + danhMuc);
                    }
                }
                // Loại xe khác
                else if (loaiDanhMuc == "PhuongTienKhac") {
                    var hasPhuTung = $("input[name='ParamRequest.HasPhuTung']").val();

                    // tp-ho-chi-minh/quan-1/mua-ban-oto/bwm
                    if (hasPhuTung == 'True') {
                        var currentDanhMuc = paramList[4];
                        var danhMucList = currentDanhMuc.split('--');
                        //Replace hãng xe
                        currentDanhMuc = currentDanhMuc.replace(danhMucList[0], danhMuc);
                        url = url.replace('/' + paramList[4], '/' + currentDanhMuc);
                    }
                    // tp-ho-chi-minh/quan-1/mua-ban-oto
                    else {
                        url = url.replace('/' + paramList[4], '/' + danhMuc);
                    }
                }
                // Danh mục dòng xe
                else if (loaiDanhMuc == "PhuongTienKhacCon") {
                    var hasPhuongTienKhacCon = $("input[name='ParamRequest.HasPhuongTenKhacCon']").val();
                    var currentDanhMuc = paramList[4];
                    var danhMucList = currentDanhMuc.split('--');
                    // tp-ho-chi-minh/quan-1/mua-ban-oto/bwm--i320
                    if (hasPhuongTienKhacCon == 'True') {
                        //Replace nam sx
                        currentDanhMuc = currentDanhMuc.replace(danhMucList[1], danhMuc);
                        url = url.replace(paramList[4], currentDanhMuc);
                    }
                    // tp-ho-chi-minh/quan-1/mua-ban-oto/bwm
                    else {
                        url = url.replace(paramList[4], paramList[4] + '--' + danhMuc);
                    }
                }
                // Phụ tùng xe
                else if (loaiDanhMuc == "PhuTungXe") {
                    var hasPhuTung = $("input[name='ParamRequest.HasPhuTung']").val();

                    // tp-ho-chi-minh/quan-1/mua-ban-oto/bwm
                    if (hasPhuTung == 'True') {
                        var currentDanhMuc = paramList[4];
                        var danhMucList = currentDanhMuc.split('--');
                        //Replace hãng xe
                        currentDanhMuc = currentDanhMuc.replace(danhMucList[0], danhMuc);
                        url = url.replace(paramList[4], currentDanhMuc);
                    }
                    // tp-ho-chi-minh/quan-1/mua-ban-oto
                    else {
                        url = url.replace(paramList[3], paramList[3] + '/' + danhMuc);
                    }
                }
            }

            // /an-giang/mua-ban-oto
            // Trên popup địa chỉ là quận huyện nhưng chưa selected
            else {
                if (loaiDanhMuc == "LoaiXe") {
                    url = url.replace(paramList[2], 'mua-ban-' + danhMuc);
                }
                else if (loaiDanhMuc == "HangXe") {
                    var haHangXe = $("input[name='ParamRequest.HasHangXe']").val();
                    // /an-giang/mua-ban-oto/bwm
                    if (haHangXe == 'True') {
                        //Replace hãng xe
                        var currentDanhMuc = paramList[3];
                        var danhMucList = currentDanhMuc.split('--');
                        currentDanhMuc = currentDanhMuc.replace(danhMucList[0], danhMuc);
                        url = url.replace(paramList[3], currentDanhMuc);
                    }
                    // /an-giang/mua-ban-oto/
                    else {
                        url = url.replace(paramList[2], paramList[2] + '/' + danhMuc);
                    }
                }
                else if (loaiDanhMuc == "DongXe") {
                    var hasDongXe = $("input[name='ParamRequest.HasDongXe']").val();
                    var currentDanhMuc = paramList[3];
                    var danhMucList = currentDanhMuc.split('--');
                    // /an-giang/mua-ban-oto/bwm---i320
                    if (hasDongXe == 'True') {
                        //Replace dòng xe
                        currentDanhMuc = currentDanhMuc.replace(danhMucList[1], danhMuc);
                        url = url.replace(paramList[3], currentDanhMuc);
                    }
                    else {
                        url = url.replace(paramList[3], paramList[3] + '--' + danhMuc);
                    }
                }
                else if (loaiDanhMuc == "NamSX") {
                    var hasNamSx = $("input[name='ParamRequest.HasNamSX']").val();
                    var currentDanhMuc = paramList[3];
                    var danhMucList = currentDanhMuc.split('--');
                    // /an-giang/mua-ban-oto/bwm---i320--2019
                    if (hasNamSx == 'True') {
                        //Replace hãng xe
                        currentDanhMuc = currentDanhMuc.replace(danhMucList[2], danhMuc);
                        url = url.replace(paramList[3], currentDanhMuc);
                    }
                    // /an-giang/mua-ban-oto/bwm---i320
                    else {
                        url = url.replace(paramList[3], paramList[3] + '--' + danhMuc);
                    }
                }
            }
        }
    }

    window.location.href = url;
});

function initTagUrl(loaiDanhMuc, danhMuc) {
    var url = "";
    var loaiXe = $('#ParamRequest_LoaiXe').val();
    var hangXe = $('#ParamRequest_HangXe').val();
    var dongXe = $('#ParamRequest_DongXe').val();
    var namSX = $('#ParamRequest_NamSX').val();
    if (danhMuc) {
        if (loaiDanhMuc == "LoaiXe") {
            url = `/toan-quoc/mua-ban-${danhMuc}`;
        }
        else if (loaiDanhMuc == "HangXe") {
            url = `/toan-quoc/mua-ban-${loaiXe}/${danhMuc}`;
        }
        else if (loaiDanhMuc == "DongXe") {
            url = `/toan-quoc/mua-ban-${loaiXe}/${hangXe}--${danhMuc}`;
        }
        else if (loaiDanhMuc == "NamSX") {
            url = `/toan-quoc/mua-ban-${loaiXe}/${hangXe}--${dongXe}--${danhMuc}`;
        }
    }
    else {
        if (loaiDanhMuc == "LoaiXe") {
            url = `/toan-quoc/mua-ban-xe`;
        }
        else if (loaiDanhMuc == "HangXe") {
            url = `/toan-quoc/mua-ban-${loaiXe}`;
        }
        else if (loaiDanhMuc == "DongXe") {
            url = `/toan-quoc/mua-ban-${loaiXe}/${hangXe}`;
        }
        else if (loaiDanhMuc == "NamSX") {
            if (namSX) {
                url = `/toan-quoc/mua-ban-${loaiXe}/${hangXe}--${dongXe}--${namSX}`;
            }
            else {
                url = `/toan-quoc/mua-ban-${loaiXe}/${hangXe}--${dongXe}`;
            }
        }
    }

    return url;
}
// tra gop
$('#has-tragop').click(function () {
    var tagCode = $('#ParamRequest_TagCode').val();
    var url = "";
    if (tagCode) {
        var loaiDanhMuc = $("input[name='ParamRequest.LoaiDanhMuc']").val();
        url = initTagUrl(loaiDanhMuc, null);
        url += '/tra-gop';
    }
    else {
        url = window.location.href;
        if ($(this).prop("checked") == true && !url.includes('tra-gop')) {
            if (url.includes('?')) {
                url = url.replace('?', '/tra-gop?');
            }
            else {
                url += '/tra-gop';
            }
        }
        // remove tra-gop
        else {
            url = url.replace('/tra-gop', '');
        }
    }
    window.location.href = url;
});

// kiem dinh
$('#has-check').click(function () {
    var tagCode = $('#ParamRequest_TagCode').val();
    var url = "";
    if (tagCode) {
        var loaiDanhMuc = $("input[name='ParamRequest.LoaiDanhMuc']").val();
        url = initTagUrl(loaiDanhMuc, null);
        url += '?i=1';
    }
    else {
        url = window.location.href;
        if ($(this).prop("checked") == true) {
            if (url.includes('?')) {
                url += '&i=1';
            }
            else {
                url += '?i=1';
            }
        }
        // remove 
        else {
            if (url.includes('&i=1')) {
                url = url.replace('&i=1', '');
            }
            else if (url.includes('?i=1')) {
                url = url.replace('?i=1', '');
            }
        }
    }
    window.location.href = url;
});

$('#tinhtrangxe-select-quicksearch').change(function () {
    var tagCode = $('#ParamRequest_TagCode').val();
    var tinhTrangXe = $(this).val();
    var url = "";
    if (tagCode) {
        var loaiDanhMuc = $("input[name='ParamRequest.LoaiDanhMuc']").val();
        url = initTagUrl(loaiDanhMuc, null);
        url += '/' + tinhTrangXe;
    }
    else {
        url = window.location.href;

        if (!url.includes('xe-moi') && !url.includes('xe-cu')) {
            if (url.includes('?')) {
                url = url.replace('?', '/' + tinhTrangXe + '?');
            }
            else {
                url += '/' + tinhTrangXe;
            }
        }
        else {
            if (tinhTrangXe) {
                if (url.includes('xe-moi')) {
                    url = url.replace('xe-moi', tinhTrangXe);
                }
                else if (url.includes('xe-cu')) {
                    url = url.replace('xe-cu', tinhTrangXe);
                }
            }
            else {
                if (url.includes('xe-moi')) {
                    url = url.replace('/xe-moi', '');
                }
                else if (url.includes('xe-cu')) {
                    url = url.replace('/xe-cu', '');
                }
            }
        }
    }
    window.location.href = url;
});


function searchFull() {
    var url = window.location.origin;
    var tinhThanh = $("input[name='ParamRequest.TinhThanh']").val();
    var diaChi = $("select[name='ParamRequest.DiaChi']").val();
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
    if (tinhThanh != 'toan-quoc' && diaChi) {
        url += '/' + diaChi;
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

// Search button
$('#btn-ap-dung > button').click(function () {
    searchFull();
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
    var tinhThanh = $("input[name='ParamRequest.TinhThanh']").val();
    var loaiXe = $("select[name='ParamRequest.LoaiXe']").val();
    var diaChi = $("select[name='ParamRequest.DiaChi']").val();
    url += '/' + tinhThanh;
    if (tinhThanh != 'toan-quoc' && diaChi) {
        url += '/' + diaChi;
    }
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

function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

$('#url-loai-xe').click(function (e) {
    e.preventDefault();
    var url = window.location.origin;
    var loaiXe = $(this).attr('data-loaixe');
    if (loaiXe) {
        var tinhThanh = $("input[name='ParamRequest.TinhThanh']").val();
        url += '/' + tinhThanh;
        var loaiDiaChi = $("input[name='ParamRequest.LoaiDiaChi']").val();
        if (loaiDiaChi == 'QuanHuyen') {
            var diaChi = $("select[name='ParamRequest.DiaChi']").val();
            if (diaChi) {
                url += '/' + diaChi;
            }
        }
        url += '/mua-ban-' + loaiXe;
        window.location.href = url;
    }
});

$('#url-dongxe').click(function (e) {
    e.preventDefault();
    var url = window.location.href;
    var path = window.location.pathname;
    var paramList = path.split('/');
    var hangXe = $(this).attr('data-hangxe');
    var tagCode = $('#ParamRequest_TagCode').val();
    if (hangXe) {
        if (tagCode) {
            var loaiXe = $('#ParamRequest_LoaiXe').val();
            url = `/toan-quoc/mua-ban-${loaiXe}/${hangXe}`;
        }
        else {
            var loaiDiaChi = $("input[name='ParamRequest.LoaiDiaChi']").val();
            if (loaiDiaChi == 'TinhThanh') {
                url = url.replace(paramList[3], hangXe);
            }
            else if (loaiDiaChi == 'QuanHuyen') {
                url = url.replace(paramList[4], hangXe);
            }
        }
        window.location.href = url;
    }
});
