var _ = require('underscore');
var SettingsLayoutBase = require('../SettingsLayoutBase');
var QualityDefinitionCollection = require('../../Quality/QualityDefinitionCollection');
var QualityDefinitionCollectionView = require('./Definition/QualityDefinitionCollectionView');

module.exports = SettingsLayoutBase.extend({
    template : 'Settings/Quality/QualityLayoutTemplate',

    regions : {
        qualityDefinition : '#quality-definition'
    },

    initialize : function() {
        this.qualityDefinitionCollection = new QualityDefinitionCollection();
        SettingsLayoutBase.prototype.initialize.apply(this, arguments);
    },

    onRender : function() {
        var promise = this.qualityDefinitionCollection.fetch();

        promise.done(_.bind(function () {
            if (this.isClosed) {
                return;
            }

            this.qualityDefinition.show(new QualityDefinitionCollectionView({ collection : this.qualityDefinitionCollection }));
        }, this));
    }
});