// Prev page
$('.prev').click(function () {
    $('.prev-form').submit();
});


$('.last-page').click(function (e) {
    e.preventDefault();
    var datacheck = $(this).attr('data-check');
    if (datacheck != null && datacheck != '' && datacheck != 0) {
        $('.tindang-last-form').submit();
    }
});