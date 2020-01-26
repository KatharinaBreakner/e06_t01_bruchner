//stories.js

"use strict";

let express = require('express');
let router = express.Router();

const Story = require('../models/Story');
const Word = require('../models/Word');

// GET home page.
router.get('/add', (req, res) => {

    Word.findRandom({}, {}, {limit: 3}, (err, dataDb) => {
        if (err) return console.error(err);
        console.log(dataDb);
        
        res.render('stories', { words: dataDb });
    });
});

router.post('/add', (req, res) => {


    let { story, word0, word1, word2} = req.body;

    let errors = [];

    // Error checks
    if ((!story) || (story.length < 20)) {
        errors.push({ text: 'Your story is too simple... it needs at least 20 characters.' });
    }

    // Errors occurred
    if (errors.length > 0)
    {
        // Retrieving the word objects from the database again.
        // This is a bit of a workaround in order to still have access to valid word
        // objects after an error is displayed.
        Word.find({ _id: [word0, word1, word2] }, (err, result_word) => {
            if (err) return console.error(err);

            res.render('stories', { errors, story, words: result_word });
        });
    }
    // All good, let's save the input
    // to the database
    else {
        let data = new Story({
            story,
            words: [word0, word1, word2]
        });
        // console.log(tmp);

        data.save((err, element) => {
            if (err) return console.error(err);
            console.log('New element saved', element);
        });
        res.redirect('/stories/add');
    }

    
});

module.exports = router;