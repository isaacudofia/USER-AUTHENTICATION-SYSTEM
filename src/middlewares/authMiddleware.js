import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  // Format: Bearer TOKEN
  const token = authorization && authorization.split(" ")[1];
  if (token == null)
    return res.status(400).json({ message: "Authentication token required." });

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error)
      return res.status(403).json({ message: "Invalid or expired token." });

    // Attach user info to the request for subsequent middleware/routes
    req.user = {
      id: decoded.userId,
      username: decoded.username,
    };
    console.log(req);

    next(); // Proceed to the next middleware or route handler
  });
};

export default authMiddleware;
