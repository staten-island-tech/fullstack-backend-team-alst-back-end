const Shop = require("../Models/shops");

exports.middlewareSample = (req, res, next) => {
  req.name = "TEST";
  next();
};

exports.homepage = async (req, res) => {
  const brands = ["Gucci", "Armani", "Tommy Hilfiger", "Polo"];

  try {
    res.send(brands);
    console.log(req.name);
  } catch (error) {
    console.log(error);
  }
};

exports.createShop = async (req, res) => {
  try {
    const shop = new Shop(req.body);
  } catch (error) {
    res.status(500).json(error);
  }
};
