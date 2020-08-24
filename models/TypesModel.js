// Required Model
const { TypeModel } = require("../misc/Schemas");

module.exports = {
  getById: (typeId, callback) => {
    TypeModel.findById(typeId, { _id: 0, __v: 0 })
      .populate("generation", { _id: 0, __v: 0 })
      .populate("moveDamageClass", { _id: 0, __v: 0 })
      .exec(callback);
  },
  getByName: (typeName, callback) => {
    TypeModel.findOne({ name: typeName }, { _id: 0, __v: 0 })
      .populate("generation", { _id: 0, __v: 0 })
      .populate("moveDamageClass", { _id: 0, __v: 0 })
      .exec(callback);
  },
  searchByText: async (searchText) => {
    return await TypeModel.find(
      { name: searchText },
      { _id: 0, id: 1, name: 1, enName: 1 }
    )
      .sort({ id: 1 })
      .exec();
  },
  getIdByName: (name, callback) => {
    TypeModel.findOne({ name: name }, { _id: 0, name: 1, id: 1 }).exec(
      callback
    );
  },
};
