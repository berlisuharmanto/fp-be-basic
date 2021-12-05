const Products = require("../models/Products");

const getsAllProductsStatic = async (req, res) => {
  const search = "z";
  const products = await Products.find({}).sort("name");

  if (products) {
    res.send({
      success: true,
      message: "Product found",
      data: products,
    });
  } else {
    res.send({
      success: false,
      message: "Product not found",
    });
  }
};

const getsProduct = async (req, res) => {
  const product = await Products.findById(req.params._id);

  if (product) {
    res.send({
      success: true,
      message: "Product found",
      data: product,
    });
  } else {
    res.send({
      success: false,
      message: "Product not found",
    });
  }
};

const getsAllProducts = async (req, res) => {
  const { name, sort } = req.query;
  const queryObject = {};

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let result = Products.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join("  ");

    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  const products = await result;

  if (products.length === 0) {
    res.send({
      success: true,
      data: {
        message: "Data is empty now, create a product to fill this db!",
      },
    });
  } else if (products) {
    res.send({
      success: true,
      message: "Products found",
      data: products,
    });
  } else {
    res.send({
      success: false,
      message: "Products not found",
    });
  }
};

const createProduct = async (req, res) => {
  const { name, price, prodYear } = req.body;

  const checkIdentical = async (condition, value) => {
    const prodExist = await Products.findOne({ [condition]: value });

    if (prodExist) {
      return true;
    }
    return false;
  };

  const prodExist = await checkIdentical("name", name);

  if (!prodExist) {
    const newProduct = new Products({
      name,
      price,
      prodYear,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newProduct.save();

    res.send({
      success: true,
      message: `Product ${name} created`,
    });
  } else {
    res.send({
      success: false,
      message: `Product ${name} already exist`,
    });
  }
};

const updateProduct = async (req, res) => {
  const { name, sort } = req.query;
  const { newName, price, prodYear } = req.body;

  const queryObject = {};

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let result = Products.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join("  ");

    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  const products = await result;

  if (products.length === 1) {
    await Products.findOneAndUpdate(
      name,
      {
        name: newName,
        price,
        prodYear,
        updatedAt: new Date(),
      },
      { new: true }
    );

    res.send({
      success: true,
      message: `Sucessfully update ${name}!`,
    });
  } else {
    res.send({
      success: false,
      message: `Data ${name} cannot be found!`,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { name, sort } = req.query;
  const queryObject = {};

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let result = Products.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join("  ");

    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  const products = await result;

  if (products.length === 1) {
    await Products.findOneAndDelete(name);
    res.send({
      success: true,
      message: `Sucessfully deleted ${name}!`,
    });
  } else {
    res.send({
      success: false,
      message: `Data ${name} cannot be found!`,
    });
  }
};

module.exports = {
  getsAllProducts,
  getsProduct,
  getsAllProductsStatic,
  createProduct,
  updateProduct,
  deleteProduct,
};
