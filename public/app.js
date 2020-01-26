// app.js

// TODO 1
// Import the needed modules 
// (which must be installed via npm)
const express = require('express');
// TODO 7
const exphbs = require('express-handlebars');
// TODO 17
// Import database connection (it is
// just in a different file)
const db = require('./config/database');
// TODO 21a
const bodyParser = require('body-parser');
// An express object to access all the module's magic
// such as requests, routes and views
const app = express();

// Have the app listen to port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on ${port}`));

// Static files, such as css and images (these
// are freely accessible for a client)
app.use(express.static('public'));

// TODO 8
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs());
// TODO 21b
app.use(bodyParser.urlencoded({ extended: false }));
// TODO 2
// Routes, which are basically 
// the different sub-pages of the website
// CAREFUL: routes must be defined last 
// when all app configurations are done
app.use('/', require('./routes/index'));
app.use('/stories', require('./routes/stories'));
app.use('/words', require('./routes/words'));