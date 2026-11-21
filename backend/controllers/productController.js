import ProductModel from "../models/productModel.js";
import redisClient from "../config/redis.js";

// ======================================================
// CREATE PRODUCT
// ======================================================
export const createProduct = async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET ALL PRODUCTS
// ======================================================
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("GET ALL PRODUCTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// ======================================================
// GET PRODUCT BY ID + REDIS CACHE
// ======================================================
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const redisKey = `product:${id}`;

    // 1. Try Redis only if connected
    if (redisClient.isReady) {
      try {
        const cachedProduct = await redisClient.get(redisKey);

        if (cachedProduct) {
          return res.status(200).json({
            success: true,
            source: "redis",
            product: JSON.parse(cachedProduct),
          });
        }
      } catch (redisError) {
        console.error("Redis cache read failed:", redisError.message);
      }
    }

    // 2. Fetch from MongoDB
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 3. Cache only if Redis is available
    if (redisClient.isReady) {
      try {
        await redisClient.setEx(
          redisKey,
          300,
          JSON.stringify(product)
        );
      } catch (redisError) {
        console.error("Redis cache write failed:", redisError.message);
      }
    }

    return res.status(200).json({
      success: true,
      source: "mongodb",
      product,
    });

  } catch (error) {
    console.error("GET PRODUCT BY ID ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch product by ID",
    });
  }
};

// ======================================================
// UPDATE PRODUCT
// ======================================================
export const updateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

// ======================================================
// DELETE PRODUCT
// ======================================================
export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};