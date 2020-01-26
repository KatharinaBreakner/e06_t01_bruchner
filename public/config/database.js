// database.js

const mongoose = require('mongoose');

// TODO 22
const dbUrl = 'mongodb+srv://admin:admin123@cluster0-hgrys.mongodb.net/storytelling?retryWrites=true&w=majority';

// Connecting
mongoose.connect(dbUrl,
                {useNewUrlParser: true, useUnifiedTopology: true}, 
                (err) => 
{
    if (err) return console.log('Unable to connect to the mongoDB server. Error:', err);
    else console.log('Connection established to', dbUrl);
});

module.exports = mongoose.connection;