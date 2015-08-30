var Backbone = require('backbone');
var DelayProfileModel = require('./DelayProfileModel');

module.exports = Backbone.Collection.extend({
    model : DelayProfileModel,
    url   : window.Sonarr.ApiRoot + '/delayprofile'
});