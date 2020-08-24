// Required Model
const { AbilityModel } = require("../misc/Schemas");

module.exports = {
  searchByText: async (searchText) => {
    return await AbilityModel.find(
      { name: searchText },
      { _id: 0, __v: 0, name: 0 }
    )
      .sort({ id: 1 })
      .populate("generation", { _id: 0, enName: 1 })
      .exec();
  },
  getAllIdName: (callback) => {
    AbilityModel.find({}, { _id: 0, id: 1, enName: 1, name: 1 })
      .sort({ enName: 1 })
      .exec(callback);
  },
};
