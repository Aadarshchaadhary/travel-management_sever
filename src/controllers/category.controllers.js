import AppError from "../middlewares/error-handler.middlewares.js";
import Category from "../models/category.model.js";
import { delete_file, upload_file } from "../utils/cloudinary.utils.js";

const category_folder = "/categories";
// * create new category
export const create = async (req, res, next) => {
  const data = req.body;
  try {
    const { name, description } = req.body;
    const file = req.file;
    if (!file) {
      throw new AppError("category logo is. required");
    }

    const category = new Category({ name, description });
    if (file) {
      const { path, public_id } = await upload_file(file.path, category_folder);

      category.logo = {
        path,
        public_id,
      };
    }
    await category.save();
    res.status(201).json({
      message: "category created",
      status: "success",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
// *get all categories

export const getAll = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      message: "All categories fetched",
      status: "success",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};
// * get category by id

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      throw AppError("category is not found", 404);
    }

    res.status(200).json({
      message: "category id is fetched",
      status: "success",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// * upadate category
export const upadate = async (req, res, next) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    console.log(id);
    const file = req.file;
    const { name, description } = req.body;
    const category = await Category.findById(id);
    if (!category) {
      throw new AppError("category not found", 404);
    }
    if (name) {
      category.name = name;
    }
    if (description) {
      category.description = description;
    }
    if (file) {
      await delete_file(category.logo.public_id);
      await upload_file(file.path);
    }

    await category.save();

    res.status(200).json({
      message: "category is upadate",
      status: "successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
// * delete category
export const remove = async (req, res, next) => {
  try {
    const { id } = req.body;
    const category = await Category.findById(id);
    if (!category) {
      throw new AppError("category is not found", 404);
    }
    if (category.logo) {
      await delete_file(category.logo.public_id);
    }
    await category.deleteOne();
    res.status(200).json({
      message: "categroy is deleted",
      status: "success",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
