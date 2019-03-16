const express = require('express');
const app = express();
const memoRoutes = express.Router();

let Memo = require('../models/Memo');

memoRoutes.route('/add').post(function(req, res) {
    let memo = new Memo(req.body);
    memo.save()
        .then(memo => {
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

memoRoutes.route('/delete/:id').get(function(req, res) {
    Memo.findByIdAndRemove({ _id: req.params.id}, function(err, memo) {
        if(err) {
            res.json(err);
        }
        else {
            res.json('Successfully removed memo.');
        }
    })
});

module.exports = memoRoutes;