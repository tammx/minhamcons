
function selectPage(i) {
    var url = window.location.href;
    if (url.includes('page=')) {
        url = removeParam('page', url);
    }
    if (url.includes('?')) {
        if (url == window.location.origin + '/search?' || url == window.location.origin + '/?') {
            url += 'page=' + i;
        }
        else {
            url += '&page=' + i;
        }
    }
    else {
        url += '?page=' + i;
    }

    window.location.replace(url);
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

function previosPage() {
    var pagestr = $('.page-item.active a').text();
    pageIndex = parseInt(pagestr) - 1;
    if (pageIndex > 0) {
        selectPage(pageIndex);
    }
}

function nextPage() {
    var pagestr = $('.page-item.active a').text();
    pageIndex = parseInt(pagestr) + 1;
    if (pageIndex > 0) {
        selectPage(pageIndex);
    }
}