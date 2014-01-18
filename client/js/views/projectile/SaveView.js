define([
    'jquery',
    'underscore',
    'bootstrap',
    'backbone',

    'views/AlertView',

    'text!templates/projectile/save.html'
], function (
    $,
    _,
    bootstrap,
    Backbone,

    AlertView,

    template
) {

    var SaveView = Backbone.View.extend({

        tagName: 'div',

        initialize: function () {
            this.model.on("invalid", this.showErrors, this);
            this.model.on("change", this.hideErrors, this);
        },

        events: {
            'click #back': 'goBack',
            'click #submit': 'submit',
            'keypress :input': 'enter'
        },

        render: function () {
            var data = this.model.toJSON(),
                compilatedTemplate = _.template(template, data);

            this.$el.html(compilatedTemplate);

            return this;
        },

        goBack: function (e) {
            e.preventDefault();
            this.close();
            Backbone.history.navigate('contas', { trigger: true });
        },

        enter: function (e) {
            if (e.keyCode === 13) this.submit(e);
        },

        submit: function (e) {
            e.preventDefault();

            var account = {
                id: this.model.get('id'),
                name: $('#name').val(),
                email: $('#email').val(),
                password: $('#password').val(),
                confirmPassword: $('#confirmPassword').val()
            };

            this.model.save(account, {
                success: function (model, response) {
                    var view = new AlertView({ type: 'success', message: 'Conta salva com sucesso!' });
                    view.render();

                    $(':input').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
                },
                error: function (model, response) {
                    var view = new AlertView({ type: 'error', message: 'Erro ao atualizar a conta!' });
                    view.render();
                }
            });

            return false;
        },

        showErrors: function (model, errors) {
            _.each(errors, function (error) {
                var $controlGroup = $('#' + error.name).closest('.control-group');
                $controlGroup.addClass('error');
                $controlGroup.find('.help-inline').text(error.message);
            }, this);
        },

        hideErrors: function () {
            $('.control-group').removeClass('error');
            $('.help-inline').text('');
        }

    });

    return SaveView;
    
});