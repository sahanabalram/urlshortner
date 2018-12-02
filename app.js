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
app.get('/new/:urlToShorten(*)', (req, res, next) => {
    var urlToShorten = req.params.urlToShorten;
    // regex for url
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = expression;
    if (regex.test(urlToShorten) === true) {
        var short = Math.floor(Math.random() * 100000).toString();
        var data = new shortUrl({
            originalUrl: urlToShorten,
            shorterUrl: short
        });

        data.save(err => {
            if (err) {
                return res.send('Error saving to databasae');
            }
            return res.json(data);
        });
       var data = new shortUrl({
           originalUrl:'urlToShorten does not match the original format',
           shorterUrl: 'invalid url' 
       })
    }
    return res.json({data});
});

// Query to database

app.get("/:urlToForward", (req, res, next)=>{
    // stores the params
    var shorterUrl = req.params.urlToForward;
    shorturl.findOne({'shorterUrl': shorterUrl}, (error, data)=>{
        if(error){
            return res.send("Error reading database");
        }
        var re = new Regex("^(http|https)://","i");
        var stringToCheck = data.originalUrl;
        if(re.test(stringToCheck)){
            res.redirect(301, data.originalUrl);
        } else{
            res.redirect(301, 'https://' + data.originalUrl);
        }
    });
});



// listen to port
// process is for on heroku
app.listen(process.env.PORT || 3000, () => {
    console.log("Everything works");
});