require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('./database');
let UrlModel = require('./url');

// Basic Configuration
const port = process.env.PORT || 3000;

//middleware on post
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl',function(req,res){
  res.json({
    original_url: req.body.url,
    short_url: Math.floor((Math.random()*20000) +1)
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
