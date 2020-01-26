"use strict";

let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

// We need to access the stories and words
// in the database, therefore we need their
// mongoose model objects
const Story = require('../models/Story');
const Word = require('../models/Word');

// GET home page.
router.get('/', (req, res) => {

    Story.findOneRandom((err, result_story) => {
        if (err) return console.error(err);


        Word.find({ _id: result_story.words }, (err, result_word) => {
            if (err) return console.error(err);
            // console.log(result_word);

            res.render('index', { story: result_story.story, words: result_word });
        });

    });


});

module.exports = router;