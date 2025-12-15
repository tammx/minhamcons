
$(document).on("click", ".delete-item", function () {
    var id = $(this).attr("data-id")
    Swal.fire({
        title: 'Bạn có chắc chắn xóa?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok, xóa!'
    }).then((result) => {
        if (result.value) {
            fetch(urls.delete + '?id=' + id)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Xóa thành công!',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    setTimeout(function () { location.reload(); }, 1500);
                });
        }
    })
});

// search page
$(document).on("click", ".search-save-new", function () {
    var id = $(this).attr('data-id');
    var loaiTuongTac = $(this).attr('data-loaituongtac');
    var currentUrl = window.location.pathname;
    if (id) {
        $.ajax({
            url: urls.LuuTin,
            type: "POST",
            data: {
                TinDangId: id,
                LoaiTinDangTuongTac: loaiTuongTac
            },
            dataType: 'JSON',
            async: false,
            statusCode: {
                401: function () {
                    window.location.href = (urls.Login + '?returnUrl=' + currentUrl);
                }
            },
            success: function (res) {
                if (res) {
                    var idEle = '#tindang-' + id;
                    var mobileEle = '#mobile-tindang-' + id;
                    $(idEle).empty();
                    $(mobileEle).empty();
                    if (loaiTuongTac == 1) {
                        $(idEle).attr('data-loaituongtac', 0);
                        $(mobileEle).attr('data-loaituongtac', 0);
                        $(idEle).append('<img src="/assets/images/icon/ic-bookmark-active.svg"> Đã lưu');
                        $(mobileEle).append('<img src="/assets/images/mobile/ic-save-post-active.svg"><span>Đã lưu</span>');
                    }
                    else if (loaiTuongTac == 0) {
                        $(idEle).attr('data-loaituongtac', 1);
                        $(mobileEle).attr('data-loaituongtac', 1);
                        $(idEle).append('<img alt="ic-bookmark.svg" src="/assets/images/icon/ic-bookmark.svg"> Lưu tin');
                        $(mobileEle).append('<img src="/assets/images/mobile/ic-save-post.svg"><span>Lưu tin</span>');
                    }
                }
            }
        });
    }
});


// For index page and tindangchitiet page
$(document).on("click", ".index-save-new", function () {
    var id = $(this).attr('data-id');
    var loaiTuongTac = $(this).attr('data-loaituongtac');
    var currentUrl = window.location.pathname;
    if (id) {
        $.ajax({
            url: urls.LuuTin,
            type: "POST",
            data: {
                TinDangId: id,
                LoaiTinDangTuongTac: loaiTuongTac
            },
            dataType: 'JSON',
            async: false,
            statusCode: {
                401: function () {
                    window.location.href = (urls.Login + '?returnUrl=' + currentUrl);
                }
            },
            success: function (res) {
                if (res) {
                    var idEle = '#tindang-' + id;
                    $(idEle).empty();
                    if (loaiTuongTac == 1) {
                        $(idEle).attr('data-loaituongtac', 0);
                        $(idEle).append('<img src="/assets/images/icon/ic-bookmark-active.svg">')
                    }
                    else if (loaiTuongTac == 0) {
                        $(idEle).attr('data-loaituongtac', 1);
                        $(idEle).append('<img src="/assets/images/icon/ic-bookmark.svg">')
                    }
                }
            }
        });
    }
});

function openReportPopup() {
    //Popup Report//
    $.fancybox.open({
        src: '#popup-report',
        type: 'inline',
        touch: false,
        opts: {
            afterShow: function (instance, current) {
                // console.info( 'done!' );
            }
        }
    });
}

function reportTin(id) {
    var currentUrl = window.location.href.replace(window.location.origin, '');
    var errTypr = $("input[name='radio-report']:checked").val();
    var noiDung = $("#report-noidung").val();
    if (id && errTypr && errTypr != 'undefined') {
        $.ajax({
            url: urls.LuuTin,
            type: "POST",
            data: {
                TinDangId: id,
                LoaiTinDangTuongTac: 2,
                NoiDung: errTypr + '|' + noiDung.trim()
            },
            dataType: 'JSON',
            statusCode: {
                401: function () {
                    window.location.href = urls.Login + '?returnUrl=' + currentUrl;
                }
            },
            success: function (res) {
                if (res) {
                    $.fancybox.close();
                    $('#report-tin').empty();
                    $('#report-tin').append('<img src="/assets/images/icon/ic-report.svg" class="mr-1"> Đã báo tin không hợp lệ');
                    $.fancybox.open({
                        src: '.popup-report-news',
                        type: 'inline',
                        touch: false,
                        opts: {
                            afterShow: function (instance, current) {
                                // console.info( 'done!' );
                            }
                        }
                    });
                }
            }
        });
    }
}


function redirectToLogin() {
    var currentUrl = window.location.href.replace(window.location.origin, '');
    window.location.href = urls.Login + '?returnUrl=' + currentUrl;
}

// Show full phone number
$('.block-contact').click(function () {
    var phoneNumber = $(this).attr('data-phone');
    var first = phoneNumber.substring(0, 3);
    var second = phoneNumber.substring(3, 6);
    var third = phoneNumber.replace(first, '').replace(second, '');
    var phoneFormat = first + ' ' + second + ' ' + third;
    $(this).empty();
    $(this).append('<span style="margin:auto; font-size:18px;">' + phoneFormat + '</span>');
});

$('.phone-content').click(function () {
    var phoneNumber = $(this).attr('data-phone');
    if (phoneNumber && phoneNumber.length > 5) {
        var first = phoneNumber.substring(0, 3);
        var second = phoneNumber.substring(3, 6);
        var third = phoneNumber.replace(first, '').replace(second, '');
        var phoneFormat = first + ' ' + second + ' ' + third;
        $(this).empty();
        $(this).append('<span style="margin:auto; font-size:16px;"><a href="tel:' + phoneNumber + '">' + phoneFormat + '</a></span>');
    }
});

$('.follow-user').click(function () {
    userNameFollow = $(this).attr('data-user-follow');
    followUser(userNameFollow);
});

function followUser(userNameFollow) {
    var currentUrl = window.location.href.replace(window.location.origin, '');
    if (userNameFollow) {
        $.ajax({
            url: urls.FollowUser,
            type: "POST",
            data: {
                UserNameFollow: userNameFollow
            },
            dataType: 'JSON',
            async: false,
            statusCode: {
                401: function () {
                    window.location.href = urls.Login + '?returnUrl=' + currentUrl;
                }
            },
            success: function (res) {
                if (res) {
                    $('.follow-user-content').empty();
                    $('.follow-user-content').append('<button class="xt-button action-thd">ĐANG THEO DÕI</button>')
                }
            }
        });
    }
}


$('.read-notify').click(function (e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    var link = $(this).attr('data-link');
    if (id) {
        $.ajax({
            url: urlsReadNotify,
            type: "POST",
            data: {
                thongBaoId: id
            },
            dataType: 'JSON',
            success: function (res) {
                if (res) {
                    console.log(res);
                }
            }
        }).done(function () {
            window.location.href = link;
        });
    }
});

// Focus textbox
function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

function setCaretToPos(input, pos) {
    setSelectionRange(input, pos, pos);
}

function formatCurrency(value) {
    if (value && value.length > 3) {
        var result = '';
        var valueArray = value.split('');
        var resultArray = [];
        var counter = 0;
        var temp = '';
        for (var i = valueArray.length - 1; i >= 0; i--) {
            temp += valueArray[i];
            counter++
            if (counter == 3) {
                resultArray.push(temp);
                counter = 0;
                temp = '';
            }
        };
        if (counter > 0) {
            resultArray.push(temp);
        }
        for (var i = resultArray.length - 1; i >= 0; i--) {
            var resTemp = resultArray[i].split('');
            for (var j = resTemp.length - 1; j >= 0; j--) {
                result += resTemp[j];
            };
            if (i > 0) {
                result += ','
            }
        };

        return result;
    }
    else {
        return value;
    }
}

// Suggest keyword
$('#ParamRequest_q').on('keyup', function () {
    var keyword = $(this).val();
    if (keyword) {
        keyword = keyword.trim().toLowerCase();
        $('.drop-autocomplete > ul').empty();
        var firstUrl = `/toan-quoc/mua-ban-xe/?q=${keyword}`;
        $('.drop-autocomplete > ul').append(`<li data-url=${firstUrl}>Tìm kiếm từ khóa "${keyword}"</li>`);
        $.ajax({
            url: '/suggest-by-keyword/' + keyword,
            type: "GET",
            success: function (res) {
                if (res) {
                    for (var item of res) {
                        // Tag
                        if (item.parentName == null) {
                            if (item.childName.toLowerCase().includes(keyword.toLowerCase())) {
                                var newItem = item.childName.toLowerCase().split(keyword);
                                $('.drop-autocomplete > ul').append(`<li data-url=${item.urlItem}><span class="color-grey">${newItem[0]}</span>${keyword}<span class="color-grey">${newItem[1].replace(',', '')}</span></li>`);
                            }
                            else {
                                $('.drop-autocomplete > ul').append(`<li data-url=${item.urlItem}><span class="color-grey">${item.childName}</span></li>`);
                            }
                        }
                        else {
                            if (item.childName.toLowerCase().includes(keyword.toLowerCase())) {
                                var newItem = item.childName.toLowerCase().split(keyword);
                                $('.drop-autocomplete > ul').append(`<li data-url=${item.urlItem}><span class="color-grey">${newItem[0]}</span>${keyword}<span class="color-grey">${newItem[1].replace(',', '')}</span><span class="color-green"> trong ${item.parentName}</span></li>`);
                            }
                            else {
                                $('.drop-autocomplete > ul').append(`<li data-url=${item.urlItem}><span class="color-grey">${item.childName}</span> <span class="color-green"> trong ${item.parentName}</span></li>`);
                            }
                        }
                    }
                }
            }
        });

        $('.drop-autocomplete ul').show();
    } else {
        $('.drop-autocomplete ul').hide();
    }
});

$(document).on('click', '.drop-autocomplete > ul > li', function (e) {
    e.preventDefault();
    var url = $(this).attr('data-url');
    window.location.href = location.origin + url;
});

$(document).click(function (e) {
    // Đối tượng container chứa popup
    var container = $("#ParamRequest_q");

    // Nếu click bên ngoài đối tượng container thì ẩn nó đi
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.drop-autocomplete ul').hide();
    }
});

function showWaring(obj, message) {
    if (!obj || (!isNaN(obj) && obj == 0)) {
        $.notify({
            title: "Lỗi!",
            message: message
        }, {
            type: 'danger'
        });
    }
}