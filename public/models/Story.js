//Story.js

let mongoose = require('mongoose');
let random = require('mongoose-simple-random'); // for retrieving a random document

let Schema = mongoose.Schema;

let StorySchema = new Schema({
    story: {type: String, required: true},
    words : [{ type: Schema.Types.ObjectId, ref: 'Word', required: true}]
});
StorySchema.plugin(random);

// Export model
module.exports = mongoose.model('Story', StorySchema);