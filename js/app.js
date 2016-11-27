'use strict';

var IKNSA_USER_WEBSERVICE = {
    hydrateFormInfo: function (response) {
        var form = $('.iknsa-service-webform[data-action=new]');

        form.submit(function (event) {
            event.preventDefault();

            var serializedForm = form.serialize();

            $.post(IKNSA_USER_WEBSERVICE_CONFIG.new, serializedForm)
                .done(function (response) {
                    console.log('done');
                    console.log(response);
                })
                .fail(function (response) {
                    console.log('failed');
                    console.log(response);
                })
                .always(function(response) {
                    console.log('always');
                    console.log(response);
                })
            ;
        });

        $(form).attr('action', response.formDetails.form.action);
        $(form).attr('method', response.formDetails.form.method);

        $('.proj_pub_api_key', form).attr('value', IKNSA_USER_WEBSERVICE_CONFIG.apiKey);

        $('.token', form).attr('value', response.formDetails.form.fields.token.value);
        $('.token', form).attr('name', response.formDetails.form.fields.token.name);
        $('.token', form).attr('id', response.formDetails.form.fields.token.id);
        $('.token', form).attr('type', response.formDetails.form.fields.token.type);

        $('.login', form).attr('name', response.formDetails.form.fields.email.name);
        $('.login', form).attr('id', response.formDetails.form.fields.email.id);
        $('.login', form).attr('type', response.formDetails.form.fields.email.type);

        $('.pass', form).attr('name', response.formDetails.form.fields.password.name);
        $('.pass', form).attr('id', response.formDetails.form.fields.password.id);
        $('.pass', form).attr('type', response.formDetails.form.fields.password.type);
    },

    generateForm: function (formDetails) {
        $.get('/form.html?13', function () {
        }).done(function (response) {
            $('.iknsa-user-webservice[data-action=new]').html(response);
            IKNSA_USER_WEBSERVICE.hydrateFormInfo(formDetails);
        })
        ;
    },

    init: function () {
        if ($('.iknsa-user-webservice').length > 0) {

            $.each($('.iknsa-user-webservice'), function() {
                if ($(this).data('action').toLowerCase() === 'new') {
                    $.post(IKNSA_USER_WEBSERVICE_CONFIG.new, { proj_pub_api_key: IKNSA_USER_WEBSERVICE_CONFIG.apiKey})
                    .done(function(response) {
                        console.log('response');
                        console.log(response);
                        IKNSA_USER_WEBSERVICE.generateForm(response);
                    })
                    .fail(function(response) {
                        console.log('failed');
                        console.log(response);
                    })
                    .always(function(response) {
                        console.log('always');
                        console.log(response);
                    })
                    ;
                }

                if ($(this).data('action').toLowerCase() === 'list') {
                    $.post(IKNSA_USER_WEBSERVICE_CONFIG.list, { proj_pub_api_key: IKNSA_USER_WEBSERVICE_CONFIG.apiKey})
                    .done(function(response) {
                        var userContainer = '<table class="list user-list table"></table>';
                        $('.iknsa-user-webservice[data-action=list]').append(userContainer);

                        var userTh = 
                                '<thead>' +
                                    '<td>#</td>' +
                                    '<td>Username</td>' +
                                    '<td>Email</td>' +
                                    '<td>Activé</td>' +
                                    '<td>Public token</td>' +
                                '</thead>' +
                                '<tbody>' +
                                '</tbody>'
                                ;
                        $('table.user-list').prepend(userTh);

                        $.each(response.users, function(index) {
                            console.log(this);
                            var userRow = 
                                    '<tr>' +
                                        '<td>' + index + '</td>' +
                                        '<td>' + this.username + '</td>' +
                                        '<td>' + this.email + '</td>' +
                                        '<td>' + this.isActive + '</td>' +
                                        '<td>' + this.publicApiKey + '</td>' +
                                    '</tr>'                                        
                                    ;
                            $('table.user-list tbody').append(userRow)
                        });
                        console.log(response);
                    })
                    .fail(function(response) {
                        console.log('failed');
                        console.log(response);
                    })
                    .always(function(response) {
                        console.log('always');
                        console.log(response);
                    })
                    ;
                }
            });
            // $.get(IKNSA_USER_WEBSERVICE_CONFIG.urlNew, function (response) {
            // }).done(function (response) {
            //     IKNSA_USER_WEBSERVICE.generateForm(response);
            // }).fail(function (response) {
            // })
            // ;
        }
    }
};

IKNSA_USER_WEBSERVICE.init();
