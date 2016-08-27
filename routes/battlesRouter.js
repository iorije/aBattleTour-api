'use strict';

//their modules
var express = require('express');
var validator = require('validator');
//my modules
var logger = require('../utils/logger');
var Battle = require('../models/battleModel');

var router = express.Router();

// get all battles
router.get('/', function(req, res){
    // fallback on error
    var goBack = function(error){
        logger.warn('NOK: ', req.params.id, error);
        res.send('{"msg":"NOK", "id":"' + req.params.id + '", "error":"' + error + '"}');
    };
    
	Battle.find({date: { $gt: Date.now() }}, function(err, data){
	    if (!err) {
	        if (!data[0]) {
                goBack('301');
	        }else{
	            res.send(JSON.stringify(data));
	        }
	    }else{
            goBack('302');
	    }
	});
});

// get battle form
router.get('/new', function(req, res){
    res.render('pages/battles/new');
});

// save posted battle
router.post('/new', function(req, res){
    // fallback on error
    var goBack = function(error){
        logger.warn('NOK: ', req.params.id, error);
        res.send('{"msg":"NOK", "error":"' + error + '"}');
    };
    
    //check if battle is valid
    if (!req.body) {
        goBack('401');
    }
    else if(!req.body.name){
        goBack('402');
    }
    else if(!req.body.date){
        goBack('403');
    }
    else if(!req.body.comment){
        goBack('404');
    }
    else if(!req.body.location){
        goBack('405');
    }
    else if(!req.body.eventpage){
        goBack('406');
    }
    else if(!req.body.types){
        goBack('407');
    }else{
            
        //validate posted battle
        if (!validator.isAscii(req.body.name)) {
            goBack('408');
        }
        else if (!validator.isDate(req.body.date)) {
            goBack('409');
        }
        else if (!validator.isAscii(req.body.comment)) {
            goBack('410');
        }
        else if (!validator.isAscii(req.body.location)) {
            goBack('411');
        }
        else if (!validator.isAscii(req.body.eventpage)) {
            goBack('412');
        }
        else if (!validator.isBoolean(req.body.types.v1.toString())) {
            goBack('413');
        }
        else if (!validator.isBoolean(req.body.types.v2.toString())) {
            goBack('414');
        }
        else if (!validator.isBoolean(req.body.types.v3.toString())) {
            goBack('415');
        }
        else if (!validator.isBoolean(req.body.types.v4.toString())) {
            goBack('416');
        }
        else if (!validator.isBoolean(req.body.types.vc.toString())) {
            goBack('417');
        }else{
            
            // sanitize data
            var name = validator.toString(validator.trim(req.body.name));
            var date = validator.toDate(validator.trim(req.body.date));
            var comment = validator.toString(validator.trim(req.body.comment));
            var location = validator.toString(validator.trim(req.body.location));
            var eventpage = validator.toString(validator.trim(req.body.eventpage));
            var v1 = req.body.types.v1;
            var v2 = req.body.types.v2;
            var v3 = req.body.types.v3;
            var v4 = req.body.types.v4;
            var vc = req.body.types.vc;
            
            //save battle
            var battle  = new Battle({
                name: name,
                date: date,
                comment: comment,
                location: location,
                eventpage: eventpage,
                types: {
                    v1: v1,
                    v2: v2,
                    v3: v3,
                    v4: v4,
                    vc: vc
                }
            });
            battle.save(function(err, data) {
                if (!err) {
                    logger.info('saved battle');
                    res.send('{"msg":"OK"}');
                } else {
                    logger.warn('NOK: ', req.params.id, err);
                    goBack('418');
                }
            });
        }
    }
});

// get battle by ID
router.get('/:id', function(req, res){
    // fallback on error
    var goBack = function(error){
        logger.warn('NOK: ', req.params.id, error);
        res.send('{"msg":"NOK", "id":"' + req.params.id + '", "error":"' + error + '"}');
    };
    
    // validate incoming parameter
    if (!validator.isAlphanumeric(req.params.id)) {
        goBack('201');
    } else {
        Battle.findById(req.params.id, function(err, battle) {
            if (!err) {
                if (!battle) {
                    goBack('202');
                }
                else{
                    logger.info('got battle with id:', req.params.id);
	                res.send(JSON.stringify(battle));
                }
            }
            else{
                goBack('203');
            }
        });
    }
});

// update battle by ID
router.post('/u/:id', function(req, res){
    // fallback on error
    var goBack = function(error){
        logger.warn('NOK: ', req.params.id, error);
        res.send('{"msg":"NOK", "id":"' + req.params.id + '", "error":"' + error + '"}');
    };
    
    //check if battle is valid
    if (!req.body) {
        goBack('101');
    }
    else if (!validator.isAlphanumeric(req.params.id)) {
        goBack('102');
    }
    else if(!req.body.name){
        goBack('103');
    }
    else if(!req.body.date){
        goBack('104');
    }
    else if(!req.body.comment){
        goBack('105');
    }
    else if(!req.body.location){
        goBack('106');
    }
    else if(!req.body.eventpage){
        goBack('107');
    }
    else if(!req.body.types){
        goBack('108');
    }else{
            
        //validate posted battle
        if (!validator.isAscii(req.body.name)) {
            goBack('109');
        }
        else if (!validator.isDate(req.body.date)) {
            goBack('110');
        }
        else if (!validator.isAscii(req.body.comment)) {
            goBack('111');
        }
        else if (!validator.isAscii(req.body.location)) {
            goBack('112');
        }
        else if (!validator.isAscii(req.body.eventpage)) {
            goBack('113');
        }
        else if (!validator.isBoolean(req.body.types.v1.toString())) {
            goBack('114');
        }
        else if (!validator.isBoolean(req.body.types.v2.toString())) {
            goBack('115');
        }
        else if (!validator.isBoolean(req.body.types.v3.toString())) {
            goBack('116');
        }
        else if (!validator.isBoolean(req.body.types.v4.toString())) {
            goBack('117');
        }
        else if (!validator.isBoolean(req.body.types.vc.toString())) {
            goBack('118');
        }else{
            
            // sanitize data
            var name = validator.toString(validator.trim(req.body.name));
            var date = validator.toDate(validator.trim(req.body.date));
            var comment = validator.toString(validator.trim(req.body.comment));
            var location = validator.toString(validator.trim(req.body.location));
            var eventpage = validator.toString(validator.trim(req.body.eventpage));
            var v1 = req.body.types.v1;
            var v2 = req.body.types.v2;
            var v3 = req.body.types.v3;
            var v4 = req.body.types.v4;
            var vc = req.body.types.vc;
            
            //update battle
            Battle.update({ _id: req.params.id }, 
            { $set: { 
                name: name,
                date: date,
                comment: comment,
                location: location,
                eventpage: eventpage,
                types: {
                    v1: v1,
                    v2: v2,
                    v3: v3,
                    v4: v4,
                    vc: vc
                    }
                }
            }, function(err) {
                if (!err) {
                    logger.info('updated battle:', req.params.id);
                    res.send('{"msg":"OK"}');
                } else {
                    logger.warn('NOK: ', req.params.id, err);
                    goBack('119');
                }
            });
        }
    }
});

// delete battle
// router.get('/d/:id', function(req, res){
//     // validate incoming parameter
//     if (!validator.isAlphanumeric(req.params.id)) {
//         logger.warn('not valid id', req.params.id);
//         res.redirect('/battles');
//     } else {
//         Battle.findByIdAndRemove(req.params.id, function(err) {
//             if (!err) {
//                 logger.info('deleted battle with id:', req.params.id );
//                 res.redirect('/battles');
//             }
//             else{
//                 logger.warn('failed to delete battle with id:', req.params.id );
//                 res.redirect('/battles');
//             }
//         });
//     }
// });

module.exports = router;