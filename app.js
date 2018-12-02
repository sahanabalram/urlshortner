// Get all the modules and set instances
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(cors());

// Creates the database entry
app.get('/new/:urlToShorten(*)',(req, res, next)=>{
    var {urlToShorten} = req.params;
});





// listen to port
// process is for on heroku
app.listen(process.env.PORT||3000, ()=>{
    console.log("Everything works");
});
