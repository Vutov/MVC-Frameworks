import * as $ from "jquery";

const apiUrl = "http://localhost:50156/api/";

function makeAuth(type) {
    switch (type) {
        case 'basic':
            return "Bearer " + sessionStorage.authToken;
        default: break;
    }
}

function get(module, uri, auth) {
    const url = apiUrl + module + "/"  + uri;
    const authHeaders = makeAuth(auth);

    return $.ajax({
        method: "GET",
        url: url,
        headers: authHeaders
    });
}

function post(module, uri, data, auth) {
    const url = apiUrl + module + "/" + uri;
    const authHeaders = makeAuth(auth);

    let request = {
        method: "POST",
        url: url,
        headers: authHeaders
    };

    if (data !== null) {
        request.data = data;
    }
    return $.ajax(request);
}

function del(module, uri, auth) {
    const url = apiUrl + module + "/" + uri;
    const authHeaders = makeAuth(auth);

    return $.ajax({
        method: "DELETE",
        url: url,
        headers: authHeaders
    });
}

function update(module, uri, data, auth) {
    const url = apiUrl + module + "/" + uri;
    const authHeaders = makeAuth(auth);

    let request = {
        method: "PUT",
        url: url,
        headers: authHeaders,
        data: data
    };

    return $.ajax(request);
}

export {get, post, update, del};