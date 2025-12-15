// Filter
const minYear = (new Date()).getFullYear() - 30;
const maxYear = (new Date()).getFullYear() + 1;

$('#xt-loc-home').click(function () {
    $('.xt-filter-3').removeClass('d-none');
    if (!$('.xt-filter-4').hasClass('d-none')) {
        $('.xt-filter-4').addClass('d-none');
    }
    if ($('#btn-ap-dung').hasClass('d-none')) {
        $('#btn-ap-dung').removeClass('d-none');
    }
    $.fancybox.close();
    $.fancybox.open({
        src: '#popup-filter',
        type: 'inline',
        touch: false,
        opts: {
            afterShow: function (instance, current) {
                // console.info( 'done!' );
            }
        }
    });
});

function openParentPopup() {
    $('.xt-filter-3').removeClass('d-none');
    if (!$('.xt-filter-4').hasClass('d-none')) {
        $('.xt-filter-4').addClass('d-none');
    }
    if ($('#btn-ap-dung').hasClass('d-none')) {
        $('#btn-ap-dung').removeClass('d-none');
    }
}

// Back 
function backParentPopup(element) {
    $(element).addClass('d-none');
    openParentPopup();
}

// Append content theo tung loai xe
function appentFilterContent() {
    var loaiXe = $("select[name='ParamRequest.LoaiXe']").val();
    $('#filter-content').empty();
    if (loaiXe === 'oto') {
        $('#filter-content').append(`<div class="form-group">
                        <ul class="list-unstyled odo-change" id="danh-muc-xe-container">
                            <li id="hang-xe-list">
                                <input type="hidden" id="hang-xe" value=""/>
                                <input type="hidden" id="hang-xe-code" value=""/>
                                <span class="name-ft">Hãng</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                        </ul>
                    </div>
                    <div class="form-group">
                        <label for="amount">Năm sản xuất từ :</label>
                        <input type="text" id="amount3" class="mount-range" readonly>
                        <div id="slider-range3"></div>
                    </div>
                    <div class="form-group">
                        <label for="amount">Số km đi từ :</label>
                        <input type="text" id="amount4" class="mount-range" readonly>
                        <div id="slider-range4"></div>
                    </div>
                    <div class="form-group">
                        <ul class="list-unstyled odo-change">
                            <li id="mau-sac-list">
                                <input type="hidden" id="mau-sac" value=""/>
                                <span class="name-ft">Màu sắc</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="xuat-xu-list">
                                <input type="hidden" id="xuat-xu" value=""/>
                                <span class="name-ft">Xuất xứ</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="dang-xe-list">
                                <input type="hidden" id="dang-xe" value=""/>
                                <span class="name-ft">Dáng xe</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="hop-so-list">
                                <input type="hidden" id="hop-so" value=""/>
                                <span class="name-ft">Hộp số</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="nhien-lieu-list">
                                <input type="hidden" id="nhien-lieu" value=""/>
                                <span class="name-ft">Nhiên liệu</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="so-cho-list">
                                <input type="hidden" id="so-cho" value=""/>
                                <span class="name-ft">Số chỗ ngồi</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="tinh-trang-list">
                                <input type="hidden" id="tinh-trang" value=""/>
                                <span class="name-ft">Tình Trạng</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                        </ul>
                    </div>`);

        $("#slider-range3").slider({
            animate: true,
            range: true,
            min: minYear,
            max: maxYear,
            step: 1,
            values: [minYear, maxYear],
            slide: function (event, ui) {
                $("#amount3").val(ui.values[0].toString() + " đến " + ui.values[1].toString());
            }
        });
        $("#amount3").val($("#slider-range3").slider("values", 0).toString() + " đến " + $("#slider-range3").slider("values", 1).toString());

        $("#slider-range4").slider({
            animate: true,
            range: true,
            min: 0,
            max: 500000,
            step: 1,
            values: [0, 500000],
            slide: function (event, ui) {
                $("#amount4").val(ui.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " đến " + ui.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
            }
        });
        $("#amount4").val($("#slider-range4").slider("values", 0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " đến " + $("#slider-range4").slider("values", 1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    }
    else if (loaiXe === 'xe-may') {
        $('#filter-content').append(`<div class="form-group">
                        <ul class="list-unstyled odo-change" id="danh-muc-xe-container">
                            <li id="hang-xe-list">
                                <input type="hidden" id="hang-xe" value=""/>
                                <input type="hidden" id="hang-xe-code" value=""/>
                                <span class="name-ft">Hãng</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                        </ul>
                    </div>
                    <div class="form-group">
                        <label for="amount">Năm sản xuất từ :</label>
                        <input type="text" id="amount3" class="mount-range" readonly>
                        <div id="slider-range3"></div>
                    </div>
                    <div class="form-group">
                        <label for="amount">Số km đi từ :</label>
                        <input type="text" id="amount4" class="mount-range" readonly>
                        <div id="slider-range4"></div>
                    </div>
                    <div class="form-group">
                        <ul class="list-unstyled odo-change">
                            <li id="loai-xe-may-list">
                                <input type="hidden" id="loai-xe-may" value=""/>
                                <span class="name-ft">Loại xe</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="dung-tich-list">
                                <input type="hidden" id="dung-tich" value=""/>
                                <span class="name-ft">Dung tích</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                        </ul>
                    </div>`);

        $("#slider-range3").slider({
            animate: true,
            range: true,
            min: minYear,
            max: maxYear,
            step: 1,
            values: [minYear, maxYear],
            slide: function (event, ui) {
                $("#amount3").val(ui.values[0].toString() + " đến " + ui.values[1].toString());
            }
        });
        $("#amount3").val($("#slider-range3").slider("values", 0).toString() + " đến " + $("#slider-range3").slider("values", 1).toString());

        $("#slider-range4").slider({
            animate: true,
            range: true,
            min: 0,
            max: 500000,
            step: 1,
            values: [0, 500000],
            slide: function (event, ui) {
                $("#amount4").val(ui.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " đến " + ui.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
            }
        });
        $("#amount4").val($("#slider-range4").slider("values", 0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " đến " + $("#slider-range4").slider("values", 1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    }
    else if (loaiXe === 'xe-tai') {
        $('#filter-content').append(`<div class="form-group">
                        <ul class="list-unstyled odo-change" id="danh-muc-xe-container">
                            <li id="hang-xe-list">
                                <input type="hidden" id="hang-xe" value=""/>
                                <input type="hidden" id="hang-xe-code" value=""/>
                                <span class="name-ft">Hãng</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                        </ul>
                    </div>
                    <div class="form-group">
                        <label for="amount">Năm sản xuất từ :</label>
                        <input type="text" id="amount3" class="mount-range" readonly>
                        <div id="slider-range3"></div>
                    </div>
                    <div class="form-group">
                        <label for="amount">Số km đi từ :</label>
                        <input type="text" id="amount4" class="mount-range" readonly>
                        <div id="slider-range4"></div>
                    </div>
                    <div class="form-group">
                        <ul class="list-unstyled odo-change">
                            <li id="tai-trong-list">
                                <input type="hidden" id="tai-trong" value=""/>
                                <span class="name-ft">Tải trọng</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="mau-sac-list">
                                <input type="hidden" id="mau-sac" value=""/>
                                <span class="name-ft">Màu sắc</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="xuat-xu-list">
                                <input type="hidden" id="xuat-xu" value=""/>
                                <span class="name-ft">Xuất xứ</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="nhien-lieu-list">
                                <input type="hidden" id="nhien-lieu" value=""/>
                                <span class="name-ft">Nhiên liệu</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="tinh-trang-list">
                                <input type="hidden" id="tinh-trang" value=""/>
                                <span class="name-ft">Tình Trạng</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                        </ul>
                    </div>`);

        $("#slider-range3").slider({
            animate: true,
            range: true,
            min: minYear,
            max: maxYear,
            step: 1,
            values: [minYear, maxYear],
            slide: function (event, ui) {
                $("#amount3").val(ui.values[0].toString() + " đến " + ui.values[1].toString());
            }
        });
        $("#amount3").val($("#slider-range3").slider("values", 0).toString() + " đến " + $("#slider-range3").slider("values", 1).toString());

        $("#slider-range4").slider({
            animate: true,
            range: true,
            min: 0,
            max: 500000,
            step: 1,
            values: [0, 500000],
            slide: function (event, ui) {
                $("#amount4").val(ui.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " đến " + ui.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
            }
        });
        $("#amount4").val($("#slider-range4").slider("values", 0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " đến " + $("#slider-range4").slider("values", 1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    }
    else if (loaiXe === 'xe-dien') {
        $('#filter-content').append(`<div class="form-group">
                        <ul class="list-unstyled odo-change">
                            <li id="loai-xe-dien-list">
                                <input type="hidden" id="loai-xe-dien" value=""/>
                                <span class="name-ft">Loại xe</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="hang-xe-list">
                                <input type="hidden" id="hang-xe" value=""/>
                                <input type="hidden" id="hang-xe-code" value=""/>
                                <span class="name-ft">Hãng xe</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="dong-co-list">
                                <input type="hidden" id="dong-co" value=""/>
                                <span class="name-ft">Động cơ</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="xuat-xu-list">
                                <input type="hidden" id="xuat-xu" value=""/>
                                <span class="name-ft">Xuất xứ</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                             <li id="mau-sac-list">
                                <input type="hidden" id="mau-sac" value=""/>
                                <span class="name-ft">Màu sắc</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="bao-hanh-list">
                                <input type="hidden" id="bao-hanh" value=""/>
                                <span class="name-ft">Bảo hành</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                        </ul>
                    </div>`);
    }
    else if (loaiXe === 'xe-dap') {
        $('#filter-content').append(`<div class="form-group">
                        <ul class="list-unstyled odo-change">
                            <li id="loai-xe-dap-list">
                                <input type="hidden" id="loai-xe-dap" value=""/>
                                <span class="name-ft">Loại xe đạp</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="hang-xe-list">
                                <input type="hidden" id="hang-xe" value=""/>
                                <input type="hidden" id="hang-xe-code" value=""/>
                                <span class="name-ft">Hãng xe</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="xuat-xu-list">
                                <input type="hidden" id="xuat-xu" value=""/>
                                <span class="name-ft">Xuất xứ</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                             <li id="mau-sac-list">
                                <input type="hidden" id="mau-sac" value=""/>
                                <span class="name-ft">Màu sắc</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="kich-thuoc-khung-list">
                                <input type="hidden" id="kich-thuoc-khung" value=""/>
                                <span class="name-ft">Kích thước khung</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="chat-lieu-khung-list">
                                <input type="hidden" id="chat-lieu-khung" value=""/>
                                <span class="name-ft">Chất liệu khung</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="bao-hanh-list">
                                <input type="hidden" id="bao-hanh" value=""/>
                                <span class="name-ft">Bảo hành</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                        </ul>
                    </div>`);
    }
    else if (loaiXe === 'xe-khac') {
        $('#filter-content').append(`<div class="form-group">
                        <ul class="list-unstyled odo-change" id="danh-muc-xe-container">
                            <li id="loai-xe-chuyen-dung-list">
                                <input type="hidden" id="loai-xe-chuyen-dung-code" value=""/>
                                <input type="hidden" id="loai-xe-chuyen-dung" value=""/>
                                <span class="name-ft">Loại xe</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                        </ul>
                    </div>
                    <div class="form-group">
                        <label for="amount">Năm sản xuất từ :</label>
                        <input type="text" id="amount3" class="mount-range" readonly>
                        <div id="slider-range3"></div>
                    </div>
                    <div class="form-group">
                        <label for="amount">Số km đi từ :</label>
                        <input type="text" id="amount4" class="mount-range" readonly>
                        <div id="slider-range4"></div>
                    </div>
                    <div class="form-group">
                        <ul class="list-unstyled odo-change">
                            <li id="mau-sac-list">
                                <input type="hidden" id="mau-sac" value=""/>
                                <span class="name-ft">Màu sắc</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="xuat-xu-list">
                                <input type="hidden" id="xuat-xu" value=""/>
                                <span class="name-ft">Xuất xứ</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="nhien-lieu-list">
                                <input type="hidden" id="nhien-lieu" value=""/>
                                <span class="name-ft">Nhiên liệu</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                            <li id="tinh-trang-list">
                                <input type="hidden" id="tinh-trang" value=""/>
                                <span class="name-ft">Tình Trạng</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                        </ul>
                    </div>`);

        $("#slider-range3").slider({
            animate: true,
            range: true,
            min: minYear,
            max: maxYear,
            step: 1,
            values: [minYear, maxYear],
            slide: function (event, ui) {
                $("#amount3").val(ui.values[0].toString() + " đến " + ui.values[1].toString());
            }
        });
        $("#amount3").val($("#slider-range3").slider("values", 0).toString() + " đến " + $("#slider-range3").slider("values", 1).toString());

        $("#slider-range4").slider({
            animate: true,
            range: true,
            min: 0,
            max: 500000,
            step: 1,
            values: [0, 500000],
            slide: function (event, ui) {
                $("#amount4").val(ui.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " đến " + ui.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
            }
        });
        $("#amount4").val($("#slider-range4").slider("values", 0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " đến " + $("#slider-range4").slider("values", 1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    }
    else if (loaiXe === 'phu-kien') {
        $('#filter-content').append(`<div class="form-group">
                        <ul class="list-unstyled odo-change" id="danh-muc-xe-container">
                            <li id="loai-phu-tung-list">
                                <input type="hidden" id="loai-phu-tung-code" value=""/>
                                <span class="name-ft">Loại phụ tùng</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>
                        </ul>
                    </div>`);
    }
}

// Oto
// Loại xe
$('#loai-xe-list').click(function () {

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Loại xe');
    $.ajax({
        url: urls.GetAllLoaiXe,
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var loaiXe = $("select[name='ParamRequest.LoaiXe']").val();
            $('.xt-filter-4 > .popup-content').empty();
            if (!loaiXe) {
                $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-xe-item">
                        <input type="radio" id="select-loai-xe-0" name="select-loai-xe" class="custom-control-input" checked="" value="">
                        <label class="custom-control-label w-100" for="select-loai-xe-0">Xe cộ</label>
                    </div>`);
            }
            else {
                $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-xe-item">
                        <input type="radio" name="select-loai-xe" id="select-loai-xe-0" class="custom-control-input" value="">
                        <label class="custom-control-label w-100" for="select-loai-xe-0">Xe cộ</label>
                    </div>`);
            }

            for (var i = 0; i < res.length; i++) {
                if (res[i].code == loaiXe) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-xe-item">
                        <input type="radio" id="select-loai-xe-${i + 1}" name="select-loai-xe" class="custom-control-input" checked="" value="${res[i].code}">
                        <label class="custom-control-label w-100" for="select-loai-xe-${i + 1}">${res[i].tenDanhMucChiTiet}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-xe-item">
                        <input type="radio" name="select-loai-xe" id="select-loai-xe-${i + 1}" class="custom-control-input" value="${res[i].code}">
                        <label class="custom-control-label w-100" for="select-loai-xe-${i + 1}">${res[i].tenDanhMucChiTiet}</label>
                    </div>`);
                }
            }
        }
    });
});

$("select[name='ParamRequest.LoaiXe']").change(function () {
    var tenLoaiXe = $("select[name='ParamRequest.LoaiXe'] > option:selected").html();
    $('#loai-xe-list > span').empty();
    $('#loai-xe-list > span').html(tenLoaiXe);
    appentFilterContent();
})

$(document).on('click', '.loai-xe-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $("select[name='ParamRequest.LoaiXe']").val(val);
    $('#loai-xe-list > span').empty();
    $('#loai-xe-list > span').html(valName);

    appentFilterContent();
    openParentPopup();
});

// Hãng xe
$(document).on('click', '#hang-xe-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Hãng xe');
    var loaiXeCode = $("select[name='ParamRequest.LoaiXe']").val();
    $.ajax({
        url: urls.GetAllHangXe + '/' + loaiXeCode,
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var hangXe = $('#hang-xe').val();
            $('.xt-filter-4 > .popup-content').empty();
            if (hangXe == "") {
                $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 hang-xe-item">
                        <input type="radio" id="select-hang-xe-0" name="select-hang-xe" class="custom-control-input" checked="" value="" hang-xe-code="">
                        <label class="custom-control-label w-100" for="select-hang-xe-0">Tất cả</label>
                    </div>`);
            }
            else {
                $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 hang-xe-item">
                        <input type="radio" id="select-hang-xe-0" name="select-hang-xe" class="custom-control-input" value="" hang-xe-code="">
                        <label class="custom-control-label w-100" for="select-hang-xe-0">Tất cả</label>
                    </div>`);
            }
            for (var i = 0; i < res.length; i++) {
                if (res[i].id == hangXe) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 hang-xe-item">
                        <input type="radio" id="select-hang-xe-${i + 1}" name="select-hang-xe" class="custom-control-input" checked="" value="${res[i].id}" hang-xe-code="${res[i].code}">
                        <label class="custom-control-label w-100" for="select-hang-xe-${i + 1}">${res[i].tenDanhMucChiTiet}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 hang-xe-item">
                        <input type="radio" name="select-hang-xe" id="select-hang-xe-${i + 1}" class="custom-control-input" value="${res[i].id}" hang-xe-code="${res[i].code}">
                        <label class="custom-control-label w-100" for="select-hang-xe-${i + 1}">${res[i].tenDanhMucChiTiet}</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.hang-xe-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var code = $(this).children('input').attr('hang-xe-code');
    var valName = $(this).children('label').text();
    var loaiXe = $("select[name='ParamRequest.LoaiXe']").val();
    $('#hang-xe').val(val);
    $('#hang-xe-code').val(code);
    $('#danh-muc-xe-container > #dong-xe-list').remove();
    if (val && val != 0) {
        if (loaiXe === 'oto' || loaiXe === 'xe-may') {
            $('#danh-muc-xe-container').append(`<li id="dong-xe-list">
                                <input type="hidden" id="dong-xe-code" value=""/>
                                <input type="hidden" id="dong-xe" value=""/>
                                <span class="name-ft">Dòng xe</span> <img src="/../assets/images/filter/ic-arrow-right-black.svg">
                            </li>`);
        }
    }
    $('#hang-xe-list').children('span').empty();
    $('#hang-xe-list').children('span').text(valName);

    openParentPopup();
});

// Dòng xe
$(document).on('click', '#dong-xe-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Dòng xe');
    var hangXeId = $('#hang-xe').val();
    $.ajax({
        url: urls.GetDongXe + '/' + hangXeId,
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            console.log(res);
            var dongXeId = $('#dong-xe').val();
            $('.xt-filter-4 > .popup-content').empty();
            if (dongXeId == "") {
                $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 dong-xe-item">
                        <input type="radio" id="select-dong-xe-0" name="select-dong-xe" class="custom-control-input" checked="" value="" dong-xe-code="">
                        <label class="custom-control-label w-100" for="select-dong-xe-0">Tất cả</label>
                    </div>`);
            }
            else {
                $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 dong-xe-item">
                        <input type="radio" id="select-dong-xe-0" name="select-dong-xe" class="custom-control-input" value="" dong-xe-code="">
                        <label class="custom-control-label w-100" for="select-dong-xe-0">Tất cả</label>
                    </div>`);
            }
            for (var i = 0; i < res.length; i++) {
                if (res[i].id == dongXeId) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 dong-xe-item">
                        <input type="radio" id="select-dong-xe-${i + 1}" name="select-dong-xe" class="custom-control-input" checked="" value="${res[i].id}" dong-xe-code="${res[i].code}">
                        <label class="custom-control-label w-100" for="select-dong-xe-${i + 1}">${res[i].tenDanhMucChiTiet}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 dong-xe-item">
                        <input type="radio" name="select-dong-xe" id="select-dong-xe-${i + 1}" class="custom-control-input" value="${res[i].id}" dong-xe-code="${res[i].code}">
                        <label class="custom-control-label w-100" for="select-dong-xe-${i + 1}">${res[i].tenDanhMucChiTiet}</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.dong-xe-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var code = $(this).children('input').attr('dong-xe-code');
    var valName = $(this).children('label').text();
    $('#dong-xe').val(val);
    $('#dong-xe-code').val(code);
    $('#dong-xe-list').children('span').empty();
    $('#dong-xe-list').children('span').text(valName);

    openParentPopup();
});

// Màu sắc
$(document).on('click', '#mau-sac-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn màu sắc');
    $.ajax({
        url: urls.GetThongTinXe + '/1',
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            console.log(res);
            var mauSac = $('#mau-sac').val();
            $('.xt-filter-4 > .popup-content').empty();
            for (var i = 0; i < res.length; i++) {
                if (res[i].ten == mauSac) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 mau-sac-item">
                        <input type="radio" id="select-mau-sac-${i + 1}" name="select-mau-sac" class="custom-control-input" checked="" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-mau-sac-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 mau-sac-item">
                        <input type="radio" id="select-mau-sac-${i + 1}" name="select-mau-sac" class="custom-control-input" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-mau-sac-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.mau-sac-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $('#mau-sac').val(val);
    $('#mau-sac-list').children('span').empty();
    $('#mau-sac-list').children('span').text(valName);

    openParentPopup();
});

// Kiểu dáng
$(document).on('click', '#dang-xe-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn kiểu dáng xe');
    $.ajax({
        url: urls.GetThongTinXe + '/7',
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var dangXe = $('#dang-xe').val();
            $('.xt-filter-4 > .popup-content').empty();
            for (var i = 0; i < res.length; i++) {
                if (res[i].ten == dangXe) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 dang-xe-item">
                        <input type="radio" id="select-dang-xe-${i + 1}" name="select-dang-xe" class="custom-control-input" checked="" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-dang-xe-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 dang-xe-item">
                        <input type="radio" id="select-dang-xe-${i + 1}" name="select-dang-xe" class="custom-control-input" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-dang-xe-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.dang-xe-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $('#dang-xe').val(val);
    $('#dang-xe-list').children('span').empty();
    $('#dang-xe-list').children('span').text(valName);

    openParentPopup();
});

// Hộp số
$(document).on('click', '#hop-so-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn hộp số');
    var hopSo = $('#hop-so').val();
    $('.xt-filter-4 > .popup-content').empty();
    if (hopSo == 1) {
        $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 hop-so-item">
                        <input type="radio" id="select-hop-so-1" name="select-hop-so" class="custom-control-input" checked="" value="1">
                        <label class="custom-control-label w-100" for="select-hop-so-1">Tự động</label>
                    </div>
                    <div class="custom-control custom-radio pl-0 hop-so-item">
                        <input type="radio" id="select-hop-so-2" name="select-hop-so" class="custom-control-input" value="2">
                        <label class="custom-control-label w-100" for="select-hop-so-2">Số sàn</label>
                    </div>`);
    }
    else if (hopSo == 2) {
        $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 hop-so-item">
                        <input type="radio" id="select-hop-so-1" name="select-hop-so" class="custom-control-input" value="1">
                        <label class="custom-control-label w-100" for="select-hop-so-1">Tự động</label>
                    </div>
                    <div class="custom-control custom-radio pl-0 hop-so-item">
                        <input type="radio" id="select-hop-so-2" name="select-hop-so" class="custom-control-input" checked="" value="2">
                        <label class="custom-control-label w-100" for="select-hop-so-2">Số sàn</label>
                    </div>`);
    }
    else {
        $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 hop-so-item">
                        <input type="radio" id="select-hop-so-1" name="select-hop-so" class="custom-control-input" value="1">
                        <label class="custom-control-label w-100" for="select-hop-so-1">Tự động</label>
                    </div>
                    <div class="custom-control custom-radio pl-0 hop-so-item">
                        <input type="radio" id="select-hop-so-2" name="select-hop-so" class="custom-control-input" value="2">
                        <label class="custom-control-label w-100" for="select-hop-so-2">Số sàn</label>
                    </div>`);
    }
});

$(document).on('click', '.hop-so-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $('#hop-so').val(val);
    $('#hop-so-list').children('span').empty();
    $('#hop-so-list').children('span').text(valName);

    openParentPopup();
});

// Nhiên liệu
$(document).on('click', '#nhien-lieu-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn nhiên liệu');
    var nhienLieu = $('#nhien-lieu').val();
    $('.xt-filter-4 > .popup-content').empty();
    if (nhienLieu == 1) {
        $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 nhien-lieu-item">
                        <input type="radio" id="select-nhien-lieu-1" name="select-nhien-lieu" class="custom-control-input" checked="" value="1">
                        <label class="custom-control-label w-100" for="select-nhien-lieu-1">Xăng</label>
                    </div>
                    <div class="custom-control custom-radio pl-0 nhien-lieu-item">
                        <input type="radio" id="select-nhien-lieu-2" name="select-nhien-lieu" class="custom-control-input" value="2">
                        <label class="custom-control-label w-100" for="select-nhien-lieu-2">Dầu</label>
                    </div>
                    <div class="custom-control custom-radio pl-0 nhien-lieu-item">
                        <input type="radio" id="select-nhien-lieu-3" name="select-nhien-lieu" class="custom-control-input" value="3">
                        <label class="custom-control-label w-100" for="select-nhien-lieu-3">Hybrid</label>
                    </div>`);
    }
    else if (nhienLieu == 2) {
        $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 nhien-lieu-item">
                        <input type="radio" id="select-nhien-lieu-1" name="select-nhien-lieu" class="custom-control-input" value="1">
                        <label class="custom-control-label w-100" for="select-nhien-lieu-1">Xăng</label>
                    </div>
                    <div class="custom-control custom-radio pl-0 nhien-lieu-item">
                        <input type="radio" id="select-nhien-lieu-2" name="select-nhien-lieu" class="custom-control-input" checked="" value="2">
                        <label class="custom-control-label w-100" for="select-nhien-lieu-2">Dầu</label>
                    </div>
                    <div class="custom-control custom-radio pl-0 nhien-lieu-item">
                        <input type="radio" id="select-nhien-lieu-3" name="select-nhien-lieu" class="custom-control-input" value="3">
                        <label class="custom-control-label w-100" for="select-nhien-lieu-3">Hybrid</label>
                    </div>`);
    }
    else if (nhienLieu == 3) {
        $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 nhien-lieu-item">
                        <input type="radio" id="select-nhien-lieu-1" name="select-nhien-lieu" class="custom-control-input" value="1">
                        <label class="custom-control-label w-100" for="select-nhien-lieu-1">Xăng</label>
                    </div>
                    <div class="custom-control custom-radio pl-0 nhien-lieu-item">
                        <input type="radio" id="select-nhien-lieu-2" name="select-nhien-lieu" class="custom-control-input" value="2">
                        <label class="custom-control-label w-100" for="select-nhien-lieu-2">Dầu</label>
                    </div>
                    <div class="custom-control custom-radio pl-0 nhien-lieu-item">
                        <input type="radio" id="select-nhien-lieu-3" name="select-nhien-lieu" class="custom-control-input" checked="" value="3">
                        <label class="custom-control-label w-100" for="select-nhien-lieu-3">Hybrid</label>
                    </div>`);
    }
    else {
        $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 nhien-lieu-item">
                        <input type="radio" id="select-nhien-lieu-1" name="select-nhien-lieu" class="custom-control-input" value="1">
                        <label class="custom-control-label w-100" for="select-nhien-lieu-1">Xăng</label>
                    </div>
                    <div class="custom-control custom-radio pl-0 nhien-lieu-item">
                        <input type="radio" id="select-nhien-lieu-2" name="select-nhien-lieu" class="custom-control-input" value="2">
                        <label class="custom-control-label w-100" for="select-nhien-lieu-2">Dầu</label>
                    </div>
                    <div class="custom-control custom-radio pl-0 nhien-lieu-item">
                        <input type="radio" id="select-nhien-lieu-3" name="select-nhien-lieu" class="custom-control-input" value="3">
                        <label class="custom-control-label w-100" for="select-nhien-lieu-3">Hybrid</label>
                    </div>`);
    }
});

$(document).on('click', '.nhien-lieu-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $('#nhien-lieu').val(val);
    $('#nhien-lieu-list').children('span').empty();
    $('#nhien-lieu-list').children('span').text(valName);

    openParentPopup();
});

// Tình trạng xe
$(document).on('click', '#tinh-trang-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn tình trạng xe');
    var tinhTrang = $('#tinh-trang').val();
    $('.xt-filter-4 > .popup-content').empty();
    if (tinhTrang == 'xe-cu') {
        $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 tinh-trang-item">
                        <input type="radio" id="select-tinh-trang-1" name="select-tinh-trang" class="custom-control-input" checked="" value="xe-cu">
                        <label class="custom-control-label w-100" for="select-tinh-trang-1">Xe cũ</label>
                    </div>
                    <div class="custom-control custom-radio pl-0 tinh-trang-item">
                        <input type="radio" id="select-tinh-trang-2" name="select-tinh-trang" class="custom-control-input" value="xe-moi">
                        <label class="custom-control-label w-100" for="select-tinh-trang-2">Xe mới</label>
                    </div>`);
    }
    else if (tinhTrang == 'xe-moi') {
        $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 tinh-trang-item">
                        <input type="radio" id="select-tinh-trang-1" name="select-tinh-trang" class="custom-control-input"  value="xe-cu">
                        <label class="custom-control-label w-100" for="select-tinh-trang-1">Xe cũ</label>
                    </div>
                    <div class="custom-control custom-radio pl-0 tinh-trang-item">
                        <input type="radio" id="select-tinh-trang-2" name="select-tinh-trang" class="custom-control-input" checked="" value="xe-moi">
                        <label class="custom-control-label w-100" for="select-tinh-trang-2">Xe mới</label>
                    </div>`);
    }
    else {
        $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 tinh-trang-item">
                        <input type="radio" id="select-tinh-trang-1" name="select-tinh-trang" class="custom-control-input"  value="xe-cu">
                        <label class="custom-control-label w-100" for="select-tinh-trang-1">Xe cũ</label>
                    </div>
                    <div class="custom-control custom-radio pl-0 tinh-trang-item">
                        <input type="radio" id="select-tinh-trang-2" name="select-tinh-trang" class="custom-control-input" value="xe-moi">
                        <label class="custom-control-label w-100" for="select-tinh-trang-2">Xe mới</label>
                    </div>`);
    }
});

$(document).on('click', '.tinh-trang-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $('#tinh-trang').val(val);
    $('#tinh-trang-list').children('span').empty();
    $('#tinh-trang-list').children('span').text(valName);

    openParentPopup();
});

// Số chỗ ngồi
$(document).on('click', '#so-cho-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn số chỗ ngồi');
    $('.xt-filter-4 > .popup-content').empty();
    $.ajax({
        url: urls.GetThongTinXe + '/3',
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var soChoNgoi = $('#so-cho').val();
            $('.xt-filter-4 > .popup-content').empty();
            for (var i = 0; i < res.length; i++) {
                if (res[i].ten == soChoNgoi) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 so-cho-item">
                        <input type="radio" id="select-so-cho-${i + 1}" name="select-so-cho" class="custom-control-input" checked="" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-so-cho-${i + 1}">${res[i].ten} chỗ</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 so-cho-item">
                        <input type="radio" id="select-so-cho-${i + 1}" name="select-so-cho" class="custom-control-input" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-so-cho-${i + 1}">${res[i].ten} chỗ</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.so-cho-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $('#so-cho').val(val);
    $('#so-cho-list').children('span').empty();
    $('#so-cho-list').children('span').text(valName);

    openParentPopup();
});

// Xuất xứ
$(document).on('click', '#xuat-xu-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn xuất xứ xe');
    $('.xt-filter-4 > .popup-content').empty();
    $.ajax({
        url: urls.GetThongTinXe + '/2',
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var xuatXu = $('#xuat-xu').val();
            $('.xt-filter-4 > .popup-content').empty();
            for (var i = 0; i < res.length; i++) {
                if (res[i].ten == xuatXu) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 xuat-xu-item">
                        <input type="radio" id="select-xuat-xu-${i + 1}" name="select-xuat-xu" class="custom-control-input" checked="" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-xuat-xu-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 xuat-xu-item">
                        <input type="radio" id="select-xuat-xu-${i + 1}" name="select-xuat-xu" class="custom-control-input" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-xuat-xu-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.xuat-xu-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $('#xuat-xu').val(val);
    $('#xuat-xu-list').children('span').empty();
    $('#xuat-xu-list').children('span').text(valName);

    openParentPopup();
});

// Xe máy
// Loại xe máy
$(document).on('click', '#loai-xe-may-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn loại xe');
    $('.xt-filter-4 > .popup-content').empty();
    $.ajax({
        url: urls.GetThongTinXe + '/4',
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var loaiXeMay = $('#loai-xe-may').val();
            $('.xt-filter-4 > .popup-content').empty();
            for (var i = 0; i < res.length; i++) {
                if (res[i].ten == loaiXeMay) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-xe-may-item">
                        <input type="radio" id="select-loai-xe-may-${i + 1}" name="select-loai-xe-may" class="custom-control-input" checked="" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-loai-xe-may-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-xe-may-item">
                        <input type="radio" id="select-loai-xe-may-${i + 1}" name="select-loai-xe-may" class="custom-control-input" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-loai-xe-may-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.loai-xe-may-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $('#loai-xe-may').val(val);
    $('#loai-xe-may-list').children('span').empty();
    $('#loai-xe-may-list').children('span').text(valName);

    openParentPopup();
});

// Dung tích
$(document).on('click', '#dung-tich-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn dung tích');
    $('.xt-filter-4 > .popup-content').empty();
    $.ajax({
        url: urls.GetThongTinXe + '/5',
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var dungTich = $('#dung-tich').val();
            $('.xt-filter-4 > .popup-content').empty();
            for (var i = 0; i < res.length; i++) {
                if (res[i].ten == dungTich) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 dung-tich-item">
                        <input type="radio" id="select-dung-tich-${i + 1}" name="select-dung-tich" class="custom-control-input" checked="" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-dung-tich-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 dung-tich-item">
                        <input type="radio" id="select-dung-tich-${i + 1}" name="select-dung-tich" class="custom-control-input" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-dung-tich-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.dung-tich-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $('#dung-tich').val(val);
    $('#dung-tich-list').children('span').empty();
    $('#dung-tich-list').children('span').text(valName);

    openParentPopup();
});

// Xe tải
// Tải trọng
$(document).on('click', '#tai-trong-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn tải trọng');
    $('.xt-filter-4 > .popup-content').empty();
    $.ajax({
        url: urls.GetThongTinXe + '/6',
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var taiTrong = $('#tai-trong').val();
            $('.xt-filter-4 > .popup-content').empty();
            for (var i = 0; i < res.length; i++) {
                if (res[i].noiDung == taiTrong) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 tai-trong-item">
                        <input type="radio" id="select-tai-trong-${i + 1}" name="select-tai-trong" class="custom-control-input" checked="" value="${res[i].noiDung}">
                        <label class="custom-control-label w-100" for="select-tai-trong-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 tai-trong-item">
                        <input type="radio" id="select-tai-trong-${i + 1}" name="select-tai-trong" class="custom-control-input" value="${res[i].noiDung}">
                        <label class="custom-control-label w-100" for="select-tai-trong-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.tai-trong-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $('#tai-trong').val(val);
    $('#tai-trong-list').children('span').empty();
    $('#tai-trong-list').children('span').text(valName);

    openParentPopup();
});

// Xe điện
// Loại xe điện
$(document).on('click', '#loai-xe-dien-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn loại xe');
    $('.xt-filter-4 > .popup-content').empty();
    $.ajax({
        url: urls.GetThongTinXe + '/9',
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var loaiXeDien = $('#loai-xe-dien').val();
            $('.xt-filter-4 > .popup-content').empty();
            for (var i = 0; i < res.length; i++) {
                if (res[i].ten == loaiXeDien) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-xe-dien-item">
                        <input type="radio" id="select-loai-xe-dien-${i + 1}" name="select-loai-xe-dien" class="custom-control-input" checked="" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-loai-xe-dien-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-xe-dien-item">
                        <input type="radio" id="select-loai-xe-dien-${i + 1}" name="select-loai-xe-dien" class="custom-control-input" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-loai-xe-dien-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.loai-xe-dien-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $('#loai-xe-dien').val(val);
    $('#loai-xe-dien-list').children('span').empty();
    $('#loai-xe-dien-list').children('span').text(valName);

    openParentPopup();
});

// động cơ
$(document).on('click', '#dong-co-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn động cơ');
    $('.xt-filter-4 > .popup-content').empty();
    $.ajax({
        url: urls.GetThongTinXe + '/8',
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var dongCo = $('#dong-co').val();
            $('.xt-filter-4 > .popup-content').empty();
            for (var i = 0; i < res.length; i++) {
                if (res[i].noiDung == dongCo) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 dong-co-item">
                        <input type="radio" id="select-dong-co-${i + 1}" name="select-dong-co" class="custom-control-input" checked="" value="${res[i].noiDung}">
                        <label class="custom-control-label w-100" for="select-dong-co-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 dong-co-item">
                        <input type="radio" id="select-dong-co-${i + 1}" name="select-dong-co" class="custom-control-input" value="${res[i].noiDung}">
                        <label class="custom-control-label w-100" for="select-dong-co-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.dong-co-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $('#dong-co').val(val);
    $('#dong-co-list').children('span').empty();
    $('#dong-co-list').children('span').text(valName);

    openParentPopup();
});

// Bảo hành
$(document).on('click', '#bao-hanh-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn thời gian bảo hành');
    $('.xt-filter-4 > .popup-content').empty();
    $.ajax({
        url: urls.GetThongTinXe + '/10',
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var baoHanh = $('#bao-hanh').val();
            $('.xt-filter-4 > .popup-content').empty();
            for (var i = 0; i < res.length; i++) {
                if (res[i].ten == baoHanh) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 bao-hanh-item">
                        <input type="radio" id="select-bao-hanh-${i + 1}" name="select-bao-hanh" class="custom-control-input" checked="" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-bao-hanh-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 bao-hanh-item">
                        <input type="radio" id="select-bao-hanh-${i + 1}" name="select-bao-hanh" class="custom-control-input" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-bao-hanh-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.bao-hanh-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $('#bao-hanh').val(val);
    $('#bao-hanh-list').children('span').empty();
    $('#bao-hanh-list').children('span').text(valName);

    openParentPopup();
});

// Xe đạp
// Loại xe đạp
$(document).on('click', '#loai-xe-dap-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn loại xe');
    $('.xt-filter-4 > .popup-content').empty();
    $.ajax({
        url: urls.GetThongTinXe + '/13',
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var loaiXeDap = $('#loai-xe-dap').val();
            $('.xt-filter-4 > .popup-content').empty();
            for (var i = 0; i < res.length; i++) {
                if (res[i].ten == loaiXeDap) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-xe-dap-item">
                        <input type="radio" id="select-loai-xe-dap-${i + 1}" name="select-loai-xe-dap" class="custom-control-input" checked="" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-loai-xe-dap-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-xe-dap-item">
                        <input type="radio" id="select-loai-xe-dap-${i + 1}" name="select-loai-xe-dap" class="custom-control-input" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-loai-xe-dap-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.loai-xe-dap-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $('#loai-xe-dap').val(val);
    $('#loai-xe-dap-list').children('span').empty();
    $('#loai-xe-dap-list').children('span').text(valName);

    openParentPopup();
});

// Kích thước khung
$(document).on('click', '#kich-thuoc-khung-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn kích thước khung');
    $('.xt-filter-4 > .popup-content').empty();
    $.ajax({
        url: urls.GetThongTinXe + '/11',
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var kichThuocKhung = $('#kich-thuoc-khung').val();
            $('.xt-filter-4 > .popup-content').empty();
            for (var i = 0; i < res.length; i++) {
                if (res[i].ten == kichThuocKhung) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 kich-thuoc-khung-item">
                        <input type="radio" id="select-kich-thuoc-khung-${i + 1}" name="select-kich-thuoc-khung" class="custom-control-input" checked="" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-kich-thuoc-khung-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 kich-thuoc-khung-item">
                        <input type="radio" id="select-kich-thuoc-khung-${i + 1}" name="select-kich-thuoc-khung" class="custom-control-input" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-kich-thuoc-khung-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.kich-thuoc-khung-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $('#kich-thuoc-khung').val(val);
    $('#kich-thuoc-khung-list').children('span').empty();
    $('#kich-thuoc-khung-list').children('span').text(valName);

    openParentPopup();
});

// chất liệu khung
$(document).on('click', '#chat-lieu-khung-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn kích thước khung');
    $('.xt-filter-4 > .popup-content').empty();
    $.ajax({
        url: urls.GetThongTinXe + '/12',
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var chatLieuKhung = $('#chat-lieu-khung').val();
            $('.xt-filter-4 > .popup-content').empty();
            for (var i = 0; i < res.length; i++) {
                if (res[i].ten == chatLieuKhung) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 chat-lieu-khung-item">
                        <input type="radio" id="select-chat-lieu-khung-${i + 1}" name="select-chat-lieu-khung" class="custom-control-input" checked="" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-chat-lieu-khung-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 chat-lieu-khung-item">
                        <input type="radio" id="select-chat-lieu-khung-${i + 1}" name="select-chat-lieu-khung" class="custom-control-input" value="${res[i].ten}">
                        <label class="custom-control-label w-100" for="select-chat-lieu-khung-${i + 1}">${res[i].ten}</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.chat-lieu-khung-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $('#chat-lieu-khung').val(val);
    $('#chat-lieu-khung-list').children('span').empty();
    $('#chat-lieu-khung-list').children('span').text(valName);

    openParentPopup();
});

// Phương tiện khác
// Loại xe chuyên dụng
$(document).on('click', '#loai-xe-chuyen-dung-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn loại xe');
    $.ajax({
        url: urls.GetLoaiXeChuyenDung,
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var loaiXeChuyenDung = $('#loai-xe-chuyen-dung').val();
            $('.xt-filter-4 > .popup-content').empty();
            if (loaiXeChuyenDung == "") {
                $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-xe-chuyen-dung-item">
                        <input type="radio" id="select-loai-xe-chuyen-dung-0" name="select-loai-xe-chuyen-dung" class="custom-control-input" checked="" value="" loai-xe-chuyen-dung-code="">
                        <label class="custom-control-label w-100" for="select-loai-xe-chuyen-dung-0">Tất cả</label>
                    </div>`);
            }
            else {
                $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-xe-chuyen-dung-item">
                        <input type="radio" id="select-loai-xe-chuyen-dung-0" name="select-loai-xe-chuyen-dung" class="custom-control-input" value="" loai-xe-chuyen-dung-code="">
                        <label class="custom-control-label w-100" for="select-loai-xe-chuyen-dung-0">Tất cả</label>
                    </div>`);
            }
            for (var i = 0; i < res.length; i++) {
                if (res[i].id == loaiXeChuyenDung) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-xe-chuyen-dung-item">
                        <input type="radio" id="select-loai-xe-chuyen-dung-${i + 1}" name="select-loai-xe-chuyen-dung" class="custom-control-input" checked="" value="${res[i].id}" loai-xe-chuyen-dung-code="${res[i].code}">
                        <label class="custom-control-label w-100" for="select-loai-xe-chuyen-dung-${i + 1}">${res[i].tenDanhMucChiTiet}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-xe-chuyen-dung-item">
                        <input type="radio" id="select-loai-xe-chuyen-dung-${i + 1}" name="select-loai-xe-chuyen-dung" class="custom-control-input" value="${res[i].id}" loai-xe-chuyen-dung-code="${res[i].code}">
                        <label class="custom-control-label w-100" for="select-loai-xe-chuyen-dung-${i + 1}">${res[i].tenDanhMucChiTiet}</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.loai-xe-chuyen-dung-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var code = $(this).children('input').attr('loai-xe-chuyen-dung-code');
    var valName = $(this).children('label').text();
    $('#loai-xe-chuyen-dung').val(val);
    $('#loai-xe-chuyen-dung-code').val(code);
    $('#danh-muc-xe-container > #loai-xe-chuyen-dung-con-list').remove();
    if (val && val != 0) {
        if (code === 'xe-chuyen-dung') {
            $('#danh-muc-xe-container').append(`<li id="loai-xe-chuyen-dung-con-list">
                                <input type="hidden" id="loai-xe-chuyen-dung-con-code" value=""/>
                                <input type="hidden" id="loai-xe-chuyen-dung-con" value=""/>
                                <span class="name-ft">Loại xe chuyên dụng</span> <img src="../assets/images/filter/ic-arrow-right-black.svg">
                            </li>`);
        }
        else if (code === 'xe-khach-xe-buyt') {
            $('#danh-muc-xe-container').append(`<li id="loai-xe-chuyen-dung-con-list">
                                <input type="hidden" id="loai-xe-chuyen-dung-con-code" value=""/>
                                <input type="hidden" id="loai-xe-chuyen-dung-con" value=""/>
                                <span class="name-ft">Số chỗ ngồi</span> <img src="../assets/images/filter/ic-arrow-right-black.svg">
                            </li>`);
        }
    }
    $('#loai-xe-chuyen-dung-list').children('span').empty();
    $('#loai-xe-chuyen-dung-list').children('span').text(valName);

    openParentPopup();
});
// loại xe chuyên dụng con
$(document).on('click', '#loai-xe-chuyen-dung-con-list', function (e) {
    e.preventDefault();

    var code = $('#loai-xe-chuyen-dung-code').val();
    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    if (code === 'xe-chuyen-dung') {
        $('.popup-title').text('Chọn loại xe chuyên dụng');
    }
    else if (code === 'xe-khach-xe-buyt') {
        $('.popup-title').text('Chọn số chỗ ngồi');
    }
    $('.xt-filter-4 > .popup-content').empty();
    $.ajax({
        url: urls.GetAllHangXe + '/' + code,
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var loaiXeChuyenDungCon = $('#loai-xe-chuyen-dung-con').val();
            $('.xt-filter-4 > .popup-content').empty();
            for (var i = 0; i < res.length; i++) {
                if (res[i].id == loaiXeChuyenDungCon) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-xe-chuyen-dung-con-item">
                        <input type="radio" id="select-loai-xe-chuyen-dung-con-${i + 1}" name="select-loai-xe-chuyen-dung-con" class="custom-control-input" checked="" value="${res[i].id}" loai-xe-chuyen-dung-con-code="${res[i].code}">
                        <label class="custom-control-label w-100" for="select-loai-xe-chuyen-dung-con-${i + 1}">${res[i].tenDanhMucChiTiet}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-xe-chuyen-dung-con-item">
                        <input type="radio" id="select-loai-xe-chuyen-dung-con-${i + 1}" name="select-loai-xe-chuyen-dung-con" class="custom-control-input" value="${res[i].id}" loai-xe-chuyen-dung-con-code="${res[i].code}">
                        <label class="custom-control-label w-100" for="select-loai-xe-chuyen-dung-con-${i + 1}">${res[i].tenDanhMucChiTiet}</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.loai-xe-chuyen-dung-con-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    var code = $(this).children('input').attr('loai-xe-chuyen-dung-con-code');
    $('#loai-xe-chuyen-dung-con').val(val);
    $('#loai-xe-chuyen-dung-con-code').val(code);
    $('#loai-xe-chuyen-dung-con-list').children('span').empty();
    $('#loai-xe-chuyen-dung-con-list').children('span').text(valName);

    openParentPopup();
});

// Phụ tùng
$(document).on('click', '#loai-phu-tung-list', function (e) {
    e.preventDefault();

    $('.xt-filter-3').addClass('d-none');
    $('#btn-ap-dung').addClass('d-none');
    $('.xt-filter-4').removeClass('d-none');
    $('.popup-title').empty();
    $('.popup-title').text('Chọn loại phụ tùng');
    $('.xt-filter-4 > .popup-content').empty();
    $.ajax({
        url: urls.GetAllHangXe + '/phu-kien',
        processData: false,
        contentType: false,
        type: "GET",
        success: function (res) {
            var loaiPhuTung = $('#loai-phu-tung-code').val();
            $('.xt-filter-4 > .popup-content').empty();
            for (var i = 0; i < res.length; i++) {
                if (res[i].code == loaiPhuTung) {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-phu-tung-item">
                        <input type="radio" id="select-loai-phu-tung-${i + 1}" name="select-loai-phu-tung" class="custom-control-input" checked="" value="${res[i].code}">
                        <label class="custom-control-label w-100" for="select-loai-phu-tung-${i + 1}">${res[i].tenDanhMucChiTiet}</label>
                    </div>`);
                }
                else {
                    $('.xt-filter-4 > .popup-content').append(`<div class="custom-control custom-radio pl-0 loai-phu-tung-item">
                        <input type="radio" id="select-loai-phu-tung-${i + 1}" name="select-loai-phu-tung" class="custom-control-input" value="${res[i].code}">
                        <label class="custom-control-label w-100" for="select-loai-phu-tung-${i + 1}">${res[i].tenDanhMucChiTiet}</label>
                    </div>`);
                }
            }
        }
    });
});

$(document).on('click', '.loai-phu-tung-item', function (e) {
    e.preventDefault();
    var val = $(this).children('input').val();
    var valName = $(this).children('label').text();
    $('#loai-phu-tung-code').val(val);
    $('#loai-phu-tung-list').children('span').empty();
    $('#loai-phu-tung-list').children('span').text(valName);

    openParentPopup();
});