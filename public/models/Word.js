//Word.js

let mongoose = require('mongoose');
let random = require('mongoose-simple-random'); // for retrieving a random document

let Schema = mongoose.Schema;

let WordSchema = new Schema({
    word: {type: String, required: true},
});
WordSchema.plugin(random);

// Export model
module.exports = mongoose.model('Word', WordSchema);