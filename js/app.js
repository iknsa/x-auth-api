'use strict';

var IKNSA_USER_WEBSERVICE = {
    init: function () {
        if ($('.iknsa-user-webservice').length > 0) {
            $.get('http://user.dev/api/user/new', function (response) {
                console.log(response);
            })
            ;
        }
    }
};

IKNSA_USER_WEBSERVICE.init();
