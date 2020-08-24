const { respondTo } = require("./misc/responderController");
const typeModel = require("../models/TypesModel");

module.exports.getByIdOrName = (req, res, next) => {
  const typeIdOrName = req.params.idOrName;
  if (isNaN(typeIdOrName)) {
    typeModel.getByName(typeIdOrName, (err, type) => {
      respondTo(type, err, res, next);
    });
  } else {
    typeModel.getById(Number(typeIdOrName), (err, type) => {
      respondTo(type, err, res, next);
    });
  }
};
