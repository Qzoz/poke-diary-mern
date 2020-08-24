const { _404_Err } = require("./errorController");

module.exports.respondTo = (articles, err, res, next) => {
  if (err) next(err);
  else {
    if (articles) {
      res.send(articles);
    } else {
      _404_Err(res);
    }
  }
};
