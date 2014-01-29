define([
    'jquery',
    'underscore',
    'bootstrap',
    'backbone',

    'views/AlertView',

    'text!templates/character/save.html'
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
            Backbone.history.navigate('characters', { trigger: true });
        },

        enter: function (e) {
            if (e.keyCode === 13) this.submit(e);
        },

        submit: function (e) {
            e.preventDefault();

            var character = {
                type: $('#type').val(),
                health: $('#health').val(),
                damage: $('#damage').val(),
                speed: $('#speed').val(),
                width: $('#width').val(),
                canvas: {
                    width: $('#canvas_width').val(),
                    height: $('#canvas_height').val()
                },
                components: [ $('#component').val() ],
                image: {
                    src: $('#image_src').val()
                }
            };

            this.model.save(character, {
                success: function (model, response) {
                    var view = new AlertView({ type: 'success', message: 'Character successfully saved!' });
                    view.render();

                    $(':input').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
                },
                error: function (model, response) {
                    var view = new AlertView({ type: 'danger', message: 'Error updating the character!' });
                    view.render();
                }
            });

            return false;
        },

        showErrors: function (model, errors) {
            _.each(errors, function (error) {
                var $formGroup = $('#' + error.name).closest('.form-group');
                $formGroup.addClass('has-error');
                $formGroup.find('.help-block').text(error.message);
            }, this);
        },

        hideErrors: function () {
            $('.control-group').removeClass('error');
            $('.help-inline').text('');
        }

    });

    return SaveView;
    
});