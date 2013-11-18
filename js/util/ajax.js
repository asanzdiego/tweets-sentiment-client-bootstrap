/************
 *          *
 *   AJAX   *
 *          *
 ************/

// AJAX - Get
var util_ajaxGet = function(url, data, callback) {
    console.log("GET to ", util_server_url+url);
    console.log("data=", data);
    $.ajax({
        type: "GET",
        url:  util_server_url+url,
        data: data
    })
   .done(function(json, textStatus, jqXHR) {
        console.log("json=", json);
        callback(json);
    })
    .fail(function(jqXHR, textStatus, error) {
        console.log("error=", error);
        callback(error);
    });
};

// AJAX - Post
var util_ajaxPost = function(url, data, callback) {
    console.log("POST to ", util_server_url+url);
    console.log("data=", data);
    $.ajax({
        type: "POST",
        url:  util_server_url+url,
        data: data
    })
   .done(function(json, textStatus, jqXHR) {
        console.log("json=", json);
        callback(json);
    })
    .fail(function(jqXHR, textStatus, error) {
        console.log("error=", error);
        callback(error);
    });
};

// AJAX - Put
var util_ajaxPut = function(url, data, callback) {
    console.log("PUT to ", util_server_url+url);
    console.log("data=", data);
    $.ajax({
        type: "PUT",
        url:  util_server_url+url,
        data: data
    })
   .done(function(json, textStatus, jqXHR) {
        console.log("json=", json);
        callback(json);
    })
    .fail(function(jqXHR, textStatus, error) {
        console.log("error=", error);
        callback(error);
    });
};

// AJAX - Delete
var util_ajaxDelete = function(url, data, callback) {
    console.log("DELETE to ", util_server_url+url);
    console.log("data=", data);
    $.ajax({
        type: "PUT",
        url:  util_server_url+url,
        data: data
    })
   .done(function(json, textStatus, jqXHR) {
        console.log("json=", json);
        callback(json);
    })
    .fail(function(jqXHR, textStatus, error) {
        console.log("error=", error);
        callback(error);
    });
};
