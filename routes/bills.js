var express = require('express');
var router = express.Router();

/*
 * GET bill_list.
 */
router.get('/bill_list', function(req, res) {
    var db = req.db;
    var collection = db.get('bill_list');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/add_bill', function(req, res) {
    var db = req.db;
    var collection = db.get('bill_list'); // get collection
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });

    // db.collection('collectionName').insert({req.data}, function (err, doc) {
    //        //rest of code 
    // });  
});

module.exports = router;
