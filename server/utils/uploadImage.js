import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (image) => {
  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

  const Upload = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "GroceryStore" }, (error, UploadResult) => {
        return resolve(UploadResult);
      })
      .end(buffer);
  });

  return Upload;
};

export default uploadImage;
