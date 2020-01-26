//words.js

"use strict";

var express = require('express');
var router = express.Router();

const Word = require('../models/Word');


router.get('/', (req, res) => {

    // 'word -_id': get the field word and not the field _id
    Word.find({}, 'word -_id', (err, dataDb) => {
        if (err) return console.error(err);

        res.render('words', { words: dataDb});
    });
});

router.post('/', (req, res) => {

    let word = req.body.word.toLowerCase();
    
    // Storing all possible errors
    // from our checks
    let errors = [];

    // Error checks
    if (!word) {
        errors.push({ text: 'Empty word -  that makes no sense!' });
    } else if (word.length < 3) {
        errors.push({ text: 'Are you sure that this is a real word?! Words must have at least 3 characters.' });
    }

    // Errors occurred
    if (errors.length > 0)
    {
        // Retrieving all word objects from the database again
        // A bit of a workaround in order to be able to still 
        // display all words after an error is displayed.
        // 'word -_id': get the field word and not the field _id
        Word.find({}, 'word -_id', (err, dataDb) => {
            if (err) return console.error(err);
            res.render('words', { words: dataDb, errors});
        });
    }
    // All good, let's save the input
    // to the database
    else {
        let obj = new Word({ word });
        obj.save((err, element) => {
            if (err) return console.error(err);
            console.log('New word saved in db:', element);
        });

        res.redirect('/words');
    }


});

module.exports = router;