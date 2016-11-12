'use strict';

var IKNSA_USER_WEBSERVICE = {
    hydrateFormInfo: function (response) {
        var form = $('.iknsa-service-webform');

        form.submit(function (event) {
            event.preventDefault();

            var serializedForm = form.serialize();

            $.post(IKNSA_USER_WEBSERVICE_CONFIG.urlNew, serializedForm)
                .done(function (response) {
                    console.log('done');
                    console.log(response);
                })
                .fail(function (response) {
                    console.log('failed');
                    console.log(response);
                })
            ;
        });

        console.log(response);

        $(form).attr('action', response.formDetails.form.action);
        $(form).attr('method', response.formDetails.form.method);

        $('.token', form).attr('value', response.formDetails.form.fields._token.value);
        $('.token', form).attr('name', response.formDetails.form.fields._token.name);
        $('.token', form).attr('id', response.formDetails.form.fields._token.id);
        $('.token', form).attr('type', response.formDetails.form.fields._token.type);

        $('.apiKey', form).attr('apiKey', response.formDetails.form.fields.apiKey.value);
        $('.apiKey', form).attr('name', response.formDetails.form.fields.apiKey.name);
        $('.apiKey', form).attr('id', response.formDetails.form.fields.apiKey.id);
        $('.apiKey', form).attr('type', response.formDetails.form.fields.apiKey.type);

        $('.login', form).attr('name', response.formDetails.form.fields.email.name);
        $('.login', form).attr('id', response.formDetails.form.fields.email.id);
        $('.login', form).attr('type', response.formDetails.form.fields.email.type);

        $('.pass', form).attr('name', response.formDetails.form.fields.password.name);
        $('.pass', form).attr('id', response.formDetails.form.fields.password.id);
        $('.pass', form).attr('type', response.formDetails.form.fields.password.type);
    },

    generateForm: function (formDetails) {
        $.get('/form.html', function () {
            console.log('fetching form template');
        }).done(function (response) {
            console.log('adding form to page');
            $('.iknsa-user-webservice').html(response);
            IKNSA_USER_WEBSERVICE.hydrateFormInfo(formDetails);
        })
        ;
    },

    init: function () {
        if ($('.iknsa-user-webservice').length > 0) {
            $.get(IKNSA_USER_WEBSERVICE_CONFIG.urlNew, function (response) {
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
