import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

const generateAccessToken = async (userId) => {
  const token = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_ACCESS_TOKEN,
    {
      expiresIn: "5h",
    }
  );
  return token;
};

export default generateAccessToken;
