import Product from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

//* Add Product Controller
// Endpoint: /api/product/add
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);

    const images = req.files;
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await Product.create({ ...productData, image: imagesUrl });

    return res.status(201).json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log("Error in addProduct controller", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//* Get Product Controller
// Endpoint: /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error in productList controller", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//* Get Single Product Controller
// Endpoint: /api/product/id
export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log("Error in productById controller", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//* Change Product in Stock Controller
// Endpoint: /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.status(200).json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.log("Error in changeStock controller", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
