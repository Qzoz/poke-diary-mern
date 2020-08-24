// Required Model
const { MoveModel } = require("../misc/Schemas");

module.exports = {
  searchByText: async (searchText) => {
    return await MoveModel.find(
      { name: searchText },
      { _id: 0, __v: 0, name: 0, hits: 0, statChanges: 0 }
    )
      .sort({ id: 1 })
      .populate("generation", { _id: 0, enName: 1 })
      .populate("damageClass", { _id: 0, enName: 1 })
      .populate("type", { _id: 0, enName: 1 })
      .populate("category", { _id: 0, id: 0, __v: 0 })
      .exec();
  },
};
