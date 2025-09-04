import Tour_package from "../models/package.model.js";
import Category from "../models/package.model.js";
import AppError from "../middlewares/error-handler.middlewares.js";
import { delete_file, upload_file } from "../utils/cloudinary.utils.js";

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
    } = request.body;
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
      start_date,
      end_date,
      total_seats,
      seat_availabe: parseInt(total_seats),
      price,
      destination,
      cost_type,
      destination: JSON.parse(destination ?? ""),
    });

    const package_category = await Category.FindById(category);

    if (!package_category) {
      throw new AppError("category is not founded", 404);
    }
    tour_package.category = package_category._id;

    // upload cover_image
    const { path, public_id } = await upload_file(cover_image.path, "/package");

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
// get
export const get = async (req, res, next) => {
  try {
    const tour_package = await Tour_packageour_package.find({});
    res.status(201).json({
      message: " package fetched successfully",
      status: successfully,
      data: tour_package,
    });
  } catch (error) {
    next(error);
  }

  res.status(200).json({
    message: "package fetched sucessfully",
    status: "sucsess",
  });
};
//  GetById
export const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const tour_package = await Tour_package.findById(id);
    if (!tour_package) {
      throw new AppError("package not founded", 404);
    }
    res.status(201).json({
      message: " package fetched successfully",
      status: successfully,
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
    const pkg = await Package.findById(id);
    if (!pkg) {
      throw new AppError("Package not found", 404);
    }

    // delete cover image
    if (pkg.cover_image) {
      await delete_file(pkg.cover_image);
    }

    // delete  images
    if (pkg.images) {
      await delete_file(pkg.images);
    }

    // delete package
    await pkg.deleteOne();

    await pkg.save();

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
    const pkg = await Package.FindById(id);
    if (!pkg) {
      throw new AppError("package not founded", 404);
    }
    await pkg.save();

    res.status(200).json({
      message: "package updated",
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
