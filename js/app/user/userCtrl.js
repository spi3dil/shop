/**
 * Created by Vista on 27.01.17.
 */

var loginCtrl = {
    login: function () {
        var form = $('form[name=login_form]');
        var successCallback = function (result) {
            console.log(result);
            if (result.status) {
                localStorage.auth_key = result.auth_key;
                localStorage.user_id = result.user_id;
                window.location = 'user-profile-view.html';
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.post(urlService.user.login, form.serialize(), successCallback, errorCallback)
    },
    registration: function () {
        var form = $('form[name=reg_form]');
        var successCallback = function (result) {
            console.log(result);
            if (result.status) {
                alert('Пользователь успешно зарегистрирован');
                $('.btn.login')[0].click();

            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.post(urlService.user.sign_up, form.serialize(), successCallback, errorCallback)
    },
    profile: function () {
        var data = {
            auth_key: localStorage.auth_key,
            id: localStorage.user_id
        };
        var successCallback = function (result) {
            console.log(result);
            result.avatar = "http://www.svm.biz.ua/api/web/img/" + result.avatar;
            localStorage.user_avatar = result.avatar;
            $('.top-user-image img').attr('src', localStorage.user_avatar);
            localStorage.userdata = JSON.stringify(result);
            var source = $("#user-about-template").html();
            var template = Handlebars.compile(source);
            var html = template(result);
            $("#user-about-parent").append(html);
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.get(urlService.user.profile, data, successCallback, errorCallback)
    },
    profile_edit: function () {
        $('.top-user-image img').attr('src', localStorage.user_avatar);
        var source = $("#user-about-edit-template").html();
        var template = Handlebars.compile(source);
        var html = template(JSON.parse(localStorage.userdata));
        $("#user-about-edit-parent").append(html);
    },
    save_profile: function () {
        var form = $('form[name=user-edit-form]');
        var fd = new FormData();
        var file = document.getElementById('file');
        fd.append('avatar', file.files[0]);
        fd.append('username', form.find($('input[name="username"]')).val());
        fd.append('city', form.find($('input[name="city"]')).val());
        fd.append('sex', form.find($('input[name="sex"]')).val());
        fd.append('date_birth', form.find($('input[name="date_birth"]')).val());
        fd.append('email', form.find($('input[name="email"]')).val());
        fd.append('user_id', localStorage.user_id);
        xhr = new XMLHttpRequest();

        xhr.open('POST', urlService.api + urlService.user.profile_update, true);
        xhr.onreadystatechange = function (response) {
            console.log(response);
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (JSON.parse(xhr.responseText).status) {
                    alert('Данные успешно сохранены');
                    window.location = 'user-profile-view.html';
                    return false;
                }
                else {
                    alert('Произошла ошибка');
                    return false;
                }
            }

        };

        xhr.send(fd);
        // requestService.post(urlService.user.profile_update, fd, successCallback, errorCallback)
    }
};