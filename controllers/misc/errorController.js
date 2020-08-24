module.exports._404_Err = (res) => {
  res.status(404).send("No Such Article Found");
};
