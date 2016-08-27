//my modules
var Battle = require('../models/battleModel');

module.exports.createDummyBattle = function(){
    var battle = new Battle({
        "name":"What kraakt er?",
        "types": {
            "v1":true,
            "v2":false,
            "v3":false,
            "v4":false,
            "vc":true
        },
        "date":"Wed Aug 27 2016 02:53:12 GMT+0200 (Romance Daylight Time)",
        "comment":"free field",
        "location":"Genk",
        "eventpage":"https://www.frshns.com/"
    });
    Battle.findOne({ name : battle.name}, function(err, data){
        if (!err){
            if (!data){
                battle.save();
            }
        }
    });
}

module.exports.createDummyBattle2 = function(){
    var battle = new Battle({
        "name":"Battletour?",
        "types": {
            "v1":false,
            "v2":true,
            "v3":true,
            "v4":true,
            "vc":false
        },
        "date":"Wed Sep 25 2016 02:53:12 GMT+0200 (Romance Daylight Time)",
        "comment":"free field",
        "location":"Hasselt",
        "eventpage":"https://www.frshns.com/"
    });
    Battle.findOne({ name : battle.name}, function(err, data){
        if (!err){
            if (!data){
                battle.save();
            }
        }
    });
}