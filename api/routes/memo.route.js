const express = require('express');
const app = express();
const memoRoutes = express.Router();

let Memo = require('../models/Memo');

// MEMOS
memoRoutes.route('/addMemo').post(function(req, res) {
    let memo = new Memo(req.body);
    memo.createDate = new Date();
    memo.relatedEvos = new Array();

    memo.save()
        .then(memo => {
            // console.log('add memo success');
            res.status(200).json({'memo': 'memo in added successfully.'});
        })
        .catch(err => {
            res.status(400).send('unable to save to database');
        })
});

memoRoutes.route('/').get(function(req, res) {
    Memo.find(function(err, memos) {
        if (err) {
            console.log(err);
        }
        else{
            res.json(memos);
        }
    })
});

memoRoutes.route('/edit/:id').get(function(req, res) {
    Memo.findById(req.params.id, function(err, memo) {
        res.json(memo);
    })
});

memoRoutes.route('/update/:id').post(function(req, res) {
    Memo.findById(req.params.id, function(err, next, memo) {
        if (!memo) {
            return next(new Error('Could not load memo.'));
        }
        else {
            memo.title = req.body.title;
            memo.description = req.body.description;
            memo.memoHashtags = req.body.memoHashtags;

            memo.save()
                .then(memo => {
                    res.json('Update complete.');
                })
                .catch(err => {
                    res.status(400).send('Unable to update the database.');
                });
        }
    })

});

memoRoutes.route('/deleteMemo/:id').get(function(req, res) {
    Memo.findByIdAndRemove({ _id: req.params.id}, function(err, memo) {
        if(err) {
            res.json(err);
        }
        else {
            res.json('Successfully removed memo.');
        }
    })
});


// EVOS
memoRoutes.route('/addEvo').post(function(req, res) {
    let memo = new Evo(req.body);
    memo.createDate = new Date();
    

    memo.save()
        .then(memo => {
            // console.log('add memo success');
            res.status(200).json({'memo': 'memo in added successfully.'});
        })
        .catch(err => {
            res.status(400).send('unable to save to database');
        })
});



module.exports = memoRoutes;