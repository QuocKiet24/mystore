import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

    console.log(token);
    if (!token) {
      return res.status(401).json({
        message: "Provide token",
        success: false,
        error: true,
      });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decode) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
        error: true,
      });
    }
    req.userId = decode.id;

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export default auth;