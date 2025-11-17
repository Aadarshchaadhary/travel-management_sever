import Tour_package from "../models/package.model.js";
import Category from "../models/category.model.js";
import AppError from "../middlewares/error-handler.middlewares.js";
import { delete_file, upload_file } from "../utils/cloudinary.utils.js";
import { startSession } from "mongoose";
import { getPegination } from "../utils/pagination.utils.js";

const package_folder = "/package";

// create
export const create = async (req, res, next) => {
  try {
    const {
      name,
      category,
      description,
      start_date,
      end_date,
      total_seats,
      price,
      destination,
      cost_type,
    } = req.body;
    const { cover_image, images } = req.files;
    if (!cover_image) {
      throw new AppError("Cover image is required", 400);
    }
    if (!images) {
      throw new AppError("Images is required", 400);
    }
    const tour_package = new Tour_package({
      name,
      description,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      total_seats,
      seats_available: parseInt(total_seats),
      price,
      destination,
      cost_type,
      destination: JSON.parse(destination ?? ""),
    });

    const package_category = await Category.findById(category);

    if (!package_category) {
      throw new AppError("category is not founded", 404);
    }
    tour_package.category = package_category._id;

    // upload cover_image
    const { path, public_id } = await upload_file(
      cover_image[0].path,
      "/package"
    );

    tour_package.cover_image = {
      path,
      public_id,
    };

    // upload images

    if (images && Array.isArray(images)) {
      const promise = images.map(
        async (image) => await upload_file(image.path),
        package_folder
      );

      const package_images = await Promise.all(promise);

      tour_package.images = package_images;
    }

    await tour_package.save();

    res.status(201).json({
      message: "package created",
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
// get all
export const get = async (req, res, next) => {
  try {
    let filter = {};
    const {
      query,
      type,
      min_price,
      max_price,
      start_date,
      end_date,
      page = 1,
      limit = 10,
    } = req.query;
    const current_page = Number(page);
    const query_limit = Number(limit);
    const skip = (current_page - 1) * query_limit;

    if (query) {
      filter.$or = [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },
        {
          des: {
            $regex: query,
            $options: "i",
          },
        },
      ];
    }
    if (type) {
      filter.cost_type = type;
    }
    if (min_price || max_price) {
      if (min_price) filter.price.$gte = min_price; //gte = greater than equal

      if (max_price) filter.price.$lte = max_price; // lte = less than equal
    }

    if (start_date) filter.start_date.$gte = new Date(start_date);
    if (end_date) filter.end_date.$lte = new Date(end_date);

    const tour_package = await Tour_package.find(filter)
      .populate("category")
      .limit(query_limit)
      .skip(skip)
      .sort({ createAt: -1 });

    const total_count = await Tour_package.countDocuments(filter);

    const pageination = getPegination(current_page, total_count, query_limit);
    res.status(201).json({
      message: " package fetched successfully",
      status: "successfully",
      data: tour_package,
      pageination,
    });
  } catch (error) {
    next(error);
  }
};
//  GetById
export const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const tour_package = await Tour_package.findById(id).populate("category");
    if (!tour_package) {
      throw new AppError("package not founded", 404);
    }
    res.status(201).json({
      message: " package fetched successfully",
      status: "successfully",
      data: tour_package,
    });
  } catch (error) {
    next(error);
  }
  res.status(200).json({
    messgae: "package fetched",
    status: "success",
  });
};
// delete
export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    // find package
    const tour_package = await Tour_package.findById(id);
    if (!tour_package) {
      throw new AppError("Package not found", 404);
    }

    // delete cover image
    if (tour_package.cover_image) {
      await delete_file(pkg.cover_image.public_id);
    }

    // delete  images
    if (tour_package.images) {
      await Promise.all(
        tour_package.images.map(async (image) => delete_file(image.public_id))
      );
    }

    // delete package
    await tour_package.deleteOne();

    res.status(200).json({
      message: "Package deleted successfully",
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

// update
export const update = async (req, res, next) => {
  const { id } = req.params;
  try {
    const {
      name,
      category,
      description,
      start_date,
      end_date,
      total_seats,
      price,
      destination,
      cost_type,
    } = req.body;

    const tour_package = await Tour_package.FindById(id);
    if (!tour_package) {
      throw new AppError("package not founded", 404);
    }
    if (name) tour_package.name = name;
    if (description) tour_package.description = description;
    if (total_seats) tour_package.total_seats = total_seats;
    if (start_date) tour_package.total_seats = new Date(start_date);
    if (end_date) tour_package.end_date = new Date(end_date);
    if (cost_type) tour_package.cost_type = cost_type;
    if (price) tour_package.price = price;
    if (destination) tour_package.destination = JSON.parse(destination);

    const { cover_image, images } = req.files;
    // delete cover image
    if (cover_image) {
      await delete_file(pkg.cover_image.public_id);
      const { path, public_id } = await upload_file(
        cover_image[0].path,
        package_folder
      );
      tour_package.cover_image = {
        path,
        public_id,
      };
    }
    const uploadedImages = [];
    for (const img of images) {
      const { path, public_id } = await upload_file(img.path, package_folder);
      uploadedImages.push({ path, public_id });
    }
    tour_package.images = uploadedImages;

    await pkg.save();

    res.status(200).json({
      message: "package updated",
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
