import UserModel from "../models/user.model.js";

export const admin = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId);

    if (user.role !== "ADMIN") {
      return response.status(400).json({
        message: "Only admin can access",
        error: true,
        success: false,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Permission denial",
      error: true,
      success: false,
    });
  }
};
