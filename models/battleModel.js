'use strict';

//their modules
var mongoose = require('mongoose');
//my modules
var modelUtils = require('../utils/modelUtils');

var battleSchema = new mongoose.Schema({
	name: String,
	types: {
		v1: Boolean,
		v2: Boolean,
		v3: Boolean,
		v4: Boolean,
		vc: Boolean
	},
    date: Date,
    comment: String,
    location: String,
    eventpage: String,
	update_dt: Date,
	create_dt: Date
});

// update_dt + create_dt on insert
battleSchema.pre('save', function(next) {
	modelUtils.handleCreateDt(this);
  	next();
});

// update_dt on update
battleSchema.pre('update', function(next) {
	modelUtils.handleUpdateDt(this);
  	next();
});

var Battle = mongoose.model('Battle', battleSchema);

module.exports = Battle;