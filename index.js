require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("./database");
let UrlModel = require("./url");
require('./first_url_intiate')

const dns = require("node:dns");
// Basic Configuration
const port = process.env.PORT || 3000;

//middleware on post
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", function (req, res) {
  let url = req.body.url;
  let removehttps = /^https?:\/\//i
  let httpsRegex = /^https?:\/\/.+.[.]\w+$/i;
  if (httpsRegex.test(url)) {
    url = url.replace(removehttps, "");
    console.log(url);
    dns.lookup(url, function (err, address, family) {
      if (err) {
        res.json({ error: "Invalid Hostname" });
      } else {
        UrlModel.findOne({
          original_url: req.body.url,
        })
          .then((docs) => {
            console.log("found", docs);
            if (docs == null) {
              let newURL = new UrlModel({
                original_url: req.body.url,
              });

              newURL
                .save()
                .then((docs) => {
                  console.log("saved", docs);
                  res.json({
                    original_url: docs.original_url,
                    short_url: docs.short_url
                  });
                })
                .catch((err) => {
                  console.log(err);
                 
                });
              
            }
            else {
              res.json({
                original_url: docs.original_url,
                short_url: docs.short_url
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
  else {
    res.json({error: "Invalid URL"});
  } 
});

//redirection
app.get("/api/shorturl/:url", function (req, res) {
  UrlModel.findOne({
    short_url: Number(req.params.url)
  })
  .then(docs=>{
    if (docs == null) {
      res.json({
            error: "No short URL found for the given input",
          });
    }
    else {
    res.redirect(docs.original_url);
    }
  })
  .catch(err=>{console.log(err)});
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
