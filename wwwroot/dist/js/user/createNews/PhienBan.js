$('.list-unstyled li').click(function () {
    $('.active').removeClass('active');
    $(this).addClass('active');
    var name = $(this).attr('data-name');
    if (name) {
        $('#PhienBan').val(name);
        $('#live-search-text').val(name);
        $('.next-form').submit();
    }
});

$('#live-search-text').change(function () {
    var phienBan = $(this).val();
    if (phienBan) {
        $('#PhienBan').val(phienBan);
    }
});

// Next page
$('.next').click(function () {
    var phienBan = $('#PhienBan').val();
    if (phienBan) {
        $('.next-form').submit();
    }
    else {
        $.notify({
            message: 'Vui lòng chọn phiên bản xe để tiếp tục!'
        }, {
            type: 'danger'
        });
    }
});

function selectPhienBanXe(name) {
    if (name) {
        $('#PhienBan').val(name);
        $('.next-form').submit();
    }
}

$('.live-search-text').keyup(function () {
    $('.live-search-result').empty();
    var data = PhienBanXeDataList;
    var searchField = $(this).val().toLowerCase();
    $.each(JSON.parse(data), function (key, value) {
        if (value.toLowerCase().includes(searchField)) {
            $('.live-search-result').append(`<li onclick="selectPhienBanXe('${value}')"><a>${value}</a></li>`);
        }
    });
    $('.live-search-result').show();
});

$('.live-search-text').click(function () {
    $('.live-search-result').empty();
    var searchField = $(this).val().trim().toLowerCase();
    if (searchField) {
        var data = PhienBanXeDataList;
        $.each(JSON.parse(data), function (key, value) {
            if (value.toLowerCase().includes(searchField)) {
                $('.live-search-result').append(`<li onclick="selectPhienBanXe('${value}')"><a>${value}</a></li>`);
            }
        });
        $('.live-search-result').show();
    }
    else {
        var data = PhienBanXeDataList;
        $.each(JSON.parse(data), function (key, value) {
            $('.live-search-result').append(`<li onclick="selectPhienBanXe('${value}')"><a>${value}</a></li>`);
        });
        $('.live-search-result').show();
    }
});