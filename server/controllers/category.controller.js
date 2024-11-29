import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";

export const AddCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    const addCategory = new CategoryModel({
      name,
      image,
    });

    const saveCategory = await addCategory.save();

    if (!saveCategory) {
      return res.status(500).json({
        message: "Category not created",
        success: false,
        error: true,
      });
    }

    return res.json({
      message: "Category added successfully",
      success: true,
      error: false,
      data: saveCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const GetCategoryController = async (req, res) => {
  try {
    const data = await CategoryModel.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      error: false,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const UpdateCategoryController = async (req, res) => {
  try {
    const { _id, name, image } = req.body;

    const update = await CategoryModel.updateOne(
      {
        _id,
      },
      {
        name,
        image,
      }
    );

    return res.json({
      message: "Category updated successfully",
      success: true,
      error: false,
      data: update,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const DeleteCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;

    const checkSubCategory = await SubCategoryModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();

    const checkProduct = await ProductModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();

    if (checkSubCategory > 0 || checkProduct > 0) {
      return res.status(400).json({
        message:
          "Category cannot be deleted, there are subcategories or products under this category",
        success: false,
        error: true,
      });
    }

    const deleteCategory = await CategoryModel.deleteOne({ _id: _id });
    return res.json({
      message: "Category deleted successfully",
      success: true,
      error: false,
      data: deleteCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
