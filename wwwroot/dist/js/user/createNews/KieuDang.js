$('.list-unstyled li').click(function () {
    $('.active').removeClass('active');
    $(this).addClass('active');
    var name = $(this).attr('data-name');
    if (name) {
        $('#KieuDang').val(name);
        $('#live-search-text').val(name);
        $('.next-form').submit();
    }
});

$('#live-search-text').change(function () {
    var kieuDang = $(this).val();
    if (kieuDang) {
        $('#KieuDang').val(kieuDang);
    }
});


function selectKieuDang(name) {
    if (name) {
        $('#KieuDang').val(name);
        $('.next-form').submit();
    }
}

$('.live-search-text').keyup(function () {
    $('.live-search-result').empty();
    var data = KieuDangXeDataList;
    var searchField = $(this).val().toLowerCase();
    $.each(JSON.parse(data), function (key, value) {
        if (value.toLowerCase().includes(searchField)) {
            $('.live-search-result').append(`<li onclick="selectKieuDang('${value}')"><a>${value}</a></li>`);
        }
    });
    $('.live-search-result').show();
});

$('.live-search-text').click(function () {
    $('.live-search-result').empty();
    var searchField = $(this).val().trim().toLowerCase();
    if (searchField) {
        var data = KieuDangXeDataList;
        $.each(JSON.parse(data), function (key, value) {
            if (value.toLowerCase().includes(searchField)) {
                $('.live-search-result').append(`<li onclick="selectKieuDang('${value}')"><a>${value}</a></li>`);
            }
        });
        $('.live-search-result').show();
    }
    else {
        var data = KieuDangXeDataList;
        $.each(JSON.parse(data), function (key, value) {
            $('.live-search-result').append(`<li onclick="selectKieuDang('${value}')"><a>${value}</a></li>`);
        });
        $('.live-search-result').show();
    }
});