'use strict';

var IKNSA_USER_WEBSERVICE = {
    generateForm: function (formDetails) {
        console.log(formDetails);
    },

    init: function () {
        if ($('.iknsa-user-webservice').length > 0) {
            $.get('', function (response) {
                console.log(response);
            }).done(function (response) {
                console.log('done');
                IKNSA_USER_WEBSERVICE.generateForm(response);
            }).fail(function (response) {
                console.log('failed');
                console.log(response);
            })
            ;
        }
    }
};

IKNSA_USER_WEBSERVICE.init();
