$('.list-unstyled li').click(function () {
    $('.active').removeClass('active');
    $(this).addClass('active');
    var id = $(this).attr('data-id');
    var name = $(this).attr('data-name');
    if (id) {
        $('#HangXeId').val(id);
        $('#HangXe').val(name);
        $('#live-search-text').val(name);
        $('.next-form').submit();
    }
});

function selectHangXe(id, name) {
    if (id) {
        $('#HangXeId').val(id);
        $('#HangXe').val(name);
        $('#live-search-text').val(name);
        $('.next-form').submit();
    }
}

// Next page
$('.next').click(function () {
    var id = $('#HangXeId').val();
    if (id && id != 0) {
        $('.next-form').submit();
    }
    else {
        $.notify({
            message: 'Vui lòng chọn hãng xe để tiếp tục!'
        }, {
            type: 'danger'
        });
    }
});

$('.live-search-text').keyup(function () {
    $('.live-search-result').empty();
    var data = HangXeDataList;
    var searchField = $(this).val().toLowerCase();
    $.each(JSON.parse(data), function (key, value) {
        if (value.TenDanhMucChiTiet.toLowerCase().includes(searchField)) {
            $('.live-search-result').append(`<li onclick="selectHangXe(${value.Id}, '${value.TenDanhMucChiTiet}')"><a>${value.TenDanhMucChiTiet} <img src="../uploads/${value.HinhDaiDien}"/></a></li>`);
        }
    });
    $('.live-search-result').show();
});

$('.live-search-text').click(function () {
    $('.live-search-result').empty();
    var searchField = $(this).val().trim().toLowerCase();
    if (searchField) {
        var data = HangXeDataList;
        $.each(JSON.parse(data), function (key, value) {
            if (value.TenDanhMucChiTiet.toLowerCase().includes(searchField)) {
                $('.live-search-result').append(`<li onclick="selectHangXe(${value.Id}, '${value.TenDanhMucChiTiet}')"><a>${value.TenDanhMucChiTiet} <img src="../uploads/${value.HinhDaiDien}"/></a></li>`);
            }
        });
        $('.live-search-result').show();
    }
    else {
        var data = HangXeDataList;
        $.each(JSON.parse(data), function (key, value) {
            $('.live-search-result').append(`<li onclick="selectHangXe(${value.Id}, '${value.TenDanhMucChiTiet}')"><a>${value.TenDanhMucChiTiet} <img src="../uploads/${value.HinhDaiDien}"/></a></li>`);
        });
        $('.live-search-result').show();
    }
});