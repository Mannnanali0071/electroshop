import jwt from "jsonwebtoken";

export const checkAuthenticate = (req, res, next) => {
  try {
    // Get JWT token from Authorization header
    const auth = req.headers["authorization"];
    if (!auth) {
      return res.status(403).json({
        message: "Unauthorized, JWT token is required",
        success: false,
      });
    }

    // Verify token and decode payload
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);

    // Attach decoded user data to request
    req.user = decoded;

    next(); // Proceed to next middleware/route
  } catch (error) {
    // Token invalid or expired
    res.status(403).json({
      message: "Unauthorized, JWT token wrong or expired",
      success: false,
      error: error.message,
    });
  }
};
