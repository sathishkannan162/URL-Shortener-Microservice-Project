require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('./database');
let UrlModel = require('./url');

const dns = require('node:dns');
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
  let url = req.body.url;
  let httpsRegex = /^https?:\/\//i
  if (httpsRegex.test(url)) {
  url = url.replace(httpsRegex,'');
  dns.lookup(url,function(err,address,family){
    if (err) {
      res.json({error: "Invalid URL"});
    }
    else {
      res.json({
        original_url: url,
        short_url: Math.floor((Math.random()*20000) +1)
      });
    }
  });
}
else {
  res.json({error: "Invalid URL"});
}
});

//redirection
app.get('/api/shorturl/:url',function(req,res){
  if (req.params.url== 8) {
  res.redirect('https://google.com');
  }
  else {
    res.json({
      error: "No short URL found for the given input"
    })
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
