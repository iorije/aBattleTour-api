'use strict';

module.exports.handleCreateDt = function(model){
    if (!model.create_dt){
        model.create_dt = new Date();;
    }
};

module.exports.handleUpdateDt = function(model){
	model.update({}, { update_dt: new Date() });
};