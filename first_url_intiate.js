let UrlModel = require("./url");
let example = new UrlModel({
  original_url: "https://github.com/sathishkannan162",
  short_url: 0,
});

class Example {
  constructor() {
    this._initiate();
  }
  _initiate() {
    UrlModel.findOne({
      original_url: "https://github.com/sathishkannan162",
    })
      .then((docs) => {
        if (docs == null) {
          example
            .save()
            .then((docs) => {
              console.log("example save", docs);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("already intiated", docs);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = new Example();
