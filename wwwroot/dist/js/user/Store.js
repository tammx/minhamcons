$('#SearchModel_LoaiXe').change(function () {
    var tinhThanhCode = $(this).val();
    if (tinhThanhCode) {
        $.ajax({
            url: urls.GetHangXe + '/' + tinhThanhCode,
            processData: false,
            async: false,
            contentType: false,
            type: "GET",
            success: function (res) {
                if (res != null && res.length > 0) {
                    $('#SearchModel_HangXe').removeAttr('disabled');
                    $('#SearchModel_HangXe').empty();
                    $('#SearchModel_HangXe').append(`<option value="">Hãng xe</option>`);
                    res.forEach(function (item) {
                        $('#SearchModel_HangXe').append(`<option value="${item.code}">${item.tenDanhMucChiTiet}</option>`);
                    });
                }
            }
        });
    }
    else {
        $('#SearchModel_HangXe').empty();
        $('#SearchModel_HangXe').append(`<option value="">Hãng xe</option>`);
        $('#SearchModel_HangXe').prop('disabled');
    }
});

$('#search-store').click(function () {
    var keyword = $('#SearchModel_Keyword').val();
    var tinhThanh = $('#SearchModel_TinhThanhCode').val();
    var loaiXe = $('#SearchModel_LoaiXe').val();
    var hangXe = $('#SearchModel_HangXe').val();
    var url = window.location.origin + '/cua-hang';
    if (tinhThanh) {
        url += '/' + tinhThanh;
    }
    if (loaiXe) {
        url += '/' + loaiXe;
    }
    if (hangXe) {
        url += '/' + hangXe;
    }
    if (keyword) {
        url += '?keyword=' + keyword;
    }

    window.location.href = url;
})