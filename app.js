// Get all the modules and set instances
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const shortUrl = require('./models/shortUrl');
app.use(bodyParser.json());
app.use(cors());

// Connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortUrls');
// allows node to find static content
app.use(express.static(__dirname + '/public'));
// Creates the database entry
app.get('/new/:urlToShorten(*)',(req, res, next)=>{
    var {urlToShorten} = req.params;

    return res.json({urlToShorten});
});





// listen to port
// process is for on heroku
app.listen(process.env.PORT||3000, ()=>{
    console.log("Everything works");
});
