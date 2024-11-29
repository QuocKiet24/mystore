import uploadImage from "../utils/uploadImage.js";

export const uploadImageController = async (req, res) => {
  try {
    const file = req.file;

    const upload = await uploadImage(file);

    return res.json({
      message: "Upload image successfully",
      data: upload,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
