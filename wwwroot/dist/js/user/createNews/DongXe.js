$('.list-unstyled li').click(function () {
    $('.active').removeClass('active');
    $(this).addClass('active');
    var id = $(this).attr('data-id');
    var name = $(this).attr('data-name');
    if (id) {
        $('#DongXeId').val(id);
        $('#DongXe').val(name);
        $('#live-search-text').val(name);
        $('.next-form').submit();
    }
});

// Next page
$('.next').click(function () {
    var dongxe = $('#DongXe').val();
    if (dongxe) {
        $('.next-form').submit();
    }
    else {
        $.notify({
            message: 'Vui lòng chọn dòng xe để tiếp tục!'
        }, {
            type: 'danger'
        });
    }
});

function selectDongXe(id, name) {
    if (id) {
        $('#DongXeId').val(id);
        $('#DongXe').val(name);
        $('.next-form').submit();
    }
}

$('.live-search-text').keyup(function () {
    $('.live-search-result').empty();
    var data = DongXeListData;
    var searchField = $(this).val().toLowerCase();
    $.each(JSON.parse(data), function (key, value) {
        if (value.TenDanhMucChiTiet.toLowerCase().includes(searchField)) {
            $('.live-search-result').append(`<li onclick="selectDongXe(${value.Id}, '${value.TenDanhMucChiTiet}')"><a>${value.TenDanhMucChiTiet}</a></li>`);
        }
    });
    $('.live-search-result').show();
});

$('.live-search-text').click(function () {
    $('.live-search-result').empty();
    var searchField = $(this).val().trim().toLowerCase();
    if (searchField) {
        var data = DongXeListData;
        $.each(JSON.parse(data), function (key, value) {
            if (value.TenDanhMucChiTiet.toLowerCase().includes(searchField)) {
                $('.live-search-result').append(`<li onclick="selectDongXe(${value.Id}, '${value.TenDanhMucChiTiet}')"><a>${value.TenDanhMucChiTiet}</a></li>`);
            }
        });
        $('.live-search-result').show();
    }
    else {
        var data = DongXeListData;
        $.each(JSON.parse(data), function (key, value) {
            $('.live-search-result').append(`<li onclick="selectDongXe(${value.Id}, '${value.TenDanhMucChiTiet}')"><a>${value.TenDanhMucChiTiet}</a></li>`);
        });
        $('.live-search-result').show();
    }
});
