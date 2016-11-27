'use strict';

var IKNSA_USER_WEBSERVICE = {
    hydrateFormInfo: function (response, type) {
        var form = $('.iknsa-user-webservice[data-action="' + type + '"] form');

        form.submit(function (event) {
            event.preventDefault();

            var serializedForm = form.serialize();

            $.post($(form).attr('action'), serializedForm)
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

        if (response.formDetails.form.fields.token) {
            $('.token', form).attr('value', response.formDetails.form.fields.token.value);
            $('.token', form).attr('name', response.formDetails.form.fields.token.name);
            $('.token', form).attr('id', response.formDetails.form.fields.token.id);
            $('.token', form).attr('type', response.formDetails.form.fields.token.type);
        }

        $('.login', form).attr('name', response.formDetails.form.fields.email.name);
        $('.login', form).attr('id', response.formDetails.form.fields.email.id);
        $('.login', form).attr('type', response.formDetails.form.fields.email.type);
        if (response.formDetails.form.fields.email.value != undefined) {
            $('.login', form).val(response.formDetails.form.fields.email.value);
        }

        $('.pass', form).attr('name', response.formDetails.form.fields.password.name);
        $('.pass', form).attr('id', response.formDetails.form.fields.password.id);
        $('.pass', form).attr('type', response.formDetails.form.fields.password.type);
    },

    generateForm: function (type) {
        $.get('/form.html?15', function () {
        }).done(function (response) {
            $('.iknsa-user-webservice[data-action=' + type + ']').html(response);

            $('body').trigger('iknsa-service-webform-' + type + '-generated');
        })
        ;
    },

    bindUserClickAction: function () {
        $('.user-list a').click(function(event) {
            event.preventDefault();

            IKNSA_USER_WEBSERVICE.showUser($(this).data('token'));
        });
    },

    editUser: function (token) {
        $.post(IKNSA_USER_WEBSERVICE_CONFIG.edit.replace('{token}', token), {
            proj_pub_api_key: IKNSA_USER_WEBSERVICE_CONFIG.apiKey
        })
        .done(function(response) {
            console.log('done');
            $('body').on('iknsa-service-webform-edit-generated', function() {
                IKNSA_USER_WEBSERVICE.hydrateFormInfo(response, 'edit');
            });
            IKNSA_USER_WEBSERVICE.generateForm('edit');
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
    },

    showUser: function (token) {
        $.post(IKNSA_USER_WEBSERVICE_CONFIG.show.replace('{token}', token), {
            proj_pub_api_key: IKNSA_USER_WEBSERVICE_CONFIG.apiKey
        })
        .done(function(response) {
            console.log('done');
            var user =
                    '<td>' + response.user.username + '</td>' +
                    '<td>' + response.user.email + '</td>' +
                    '<td>' + response.user.active + '</td>' +
                    '<td>' + response.user.token + '</td>'
            ;
            $('.iknsa-user-webservice[data-action=show] table tbody tr').html(user);

            $('.iknsa-user-webservice[data-action=show] button[name=edit]').click(function(event) {
                event.preventDefault();
                IKNSA_USER_WEBSERVICE.editUser(token);
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
    },

    init: function () {
        if ($('.iknsa-user-webservice').length > 0) {

            $.each($('.iknsa-user-webservice'), function() {
                if ($(this).data('action').toLowerCase() === 'new') {
                    $.post(IKNSA_USER_WEBSERVICE_CONFIG.new, { proj_pub_api_key: IKNSA_USER_WEBSERVICE_CONFIG.apiKey})
                    .done(function(response) {
                        console.log('done');
                        $('body').on('iknsa-service-webform-new-generated', function() {
                            IKNSA_USER_WEBSERVICE.hydrateFormInfo(response, 'new');
                        });
                        IKNSA_USER_WEBSERVICE.generateForm('new');
                    })
                    .fail(function(response) {
                        console.log('failed');
                    })
                    .always(function(response) {
                        console.log('always');
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
                            var userRow = 
                                    '<tr>' +
                                        '<td><a href="#" data-token="' + this.publicApiKey + '">' + index + '</a></td>' +
                                        '<td><a href="#" data-token="' + this.publicApiKey + '">' + this.username + '</a></td>' +
                                        '<td><a href="#" data-token="' + this.publicApiKey + '">' + this.email + '</a></td>' +
                                        '<td><a href="#" data-token="' + this.publicApiKey + '">' + this.isActive + '</a></td>' +
                                        '<td><a href="#" data-token="' + this.publicApiKey + '">' + this.publicApiKey + '</a></td>' +
                                    '</tr>'                                        
                                    ;
                            $('table.user-list tbody').append(userRow)
                        });

                        IKNSA_USER_WEBSERVICE.bindUserClickAction();
                    })
                    .fail(function(response) {
                        console.log('failed');
                    })
                    .always(function(response) {
                        console.log('always');
                    })
                    ;
                }
            });
        }
    }
};

IKNSA_USER_WEBSERVICE.init();
