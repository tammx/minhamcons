
$('.list-unstyled li').click(function () {
    $('.active').removeClass('active');
    $(this).addClass('active');
    var id = $(this).attr('data-id');
    var name = $(this).attr('data-name');
    if (id) {
        $('#TinhThanhId').val(id);
        $('#TinhThanh').val(name);
        $('.next-form').submit();
    }
});

function selectTinhThanh(id, name) {
    if (id) {
        $('#TinhThanhId').val(id);
        $('#TinhThanh').val(name);
        $('.next-form').submit();
    }
}
// Next page
$('.next').click(function () {
    var id = $('#TinhThanhId').val();
    if (id != 0) {
        $('.next-form').submit();
    }
    else {
        $.notify({
            message: 'Vui lòng chọn tỉnh thành để tiếp tục!'
        }, {
            type: 'danger'
        });
    }
});

$('.live-search-text').keyup(function () {
    $('.live-search-result').empty();
    var data = TinhThanhDataList;
    var searchField = $(this).val().toLowerCase();
    $.each(JSON.parse(data), function (key, value) {
        if (value.TenTinhThanh.toLowerCase().includes(searchField)) {
            $('.live-search-result').append(`<li onclick="selectTinhThanh(${value.Id}, '${value.TenTinhThanh}')"><a>${value.TenTinhThanh}</a></li>`);
        }
    });
    $('.live-search-result').show();
});

$('.live-search-text').click(function () {
    $('.live-search-result').empty();
    var searchField = $(this).val().trim().toLowerCase();
    if (searchField) {
        var data = TinhThanhDataList;
        $.each(JSON.parse(data), function (key, value) {
            if (value.TenTinhThanh.toLowerCase().includes(searchField)) {
                $('.live-search-result').append(`<li onclick="selectTinhThanh(${value.Id}, '${value.TenTinhThanh}')"><a>${value.TenTinhThanh}</a></li>`);
            }
        });
        $('.live-search-result').show();
    }
    else {
        var data = TinhThanhDataList;
        $.each(JSON.parse(data), function (key, value) {
            $('.live-search-result').append(`<li onclick="selectTinhThanh(${value.Id}, '${value.TenTinhThanh}')"><a>${value.TenTinhThanh}</a></li>`);
        });
        $('.live-search-result').show();
    }
});
