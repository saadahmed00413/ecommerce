// middleware/advancedAuth.js
import { rolePermissions } from "../config/roles.js";

export const authorizeWithPermissions = (requiredPermissions = []) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const userPermissions = rolePermissions[userRole] || [];

    // Check if user has all required permissions
    const hasAllPermissions = requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasAllPermissions) {
      return res.status(403).json({
        success: false,
        message: "Insufficient permissions",
      });
    }

    next();
  };
};
