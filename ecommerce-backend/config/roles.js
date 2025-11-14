// config/roles.js
export const ROLES = {
  USER: "user",
  EDITOR: "editor",
  MODERATOR: "moderator",
  ADMIN: "admin",
};

export const PERMISSIONS = {
  READ: "read",
  WRITE: "write",
  UPDATE: "update",
  DELETE: "delete",
  MANAGE_USERS: "manage_users",
};

// Define permissions for each role
export const rolePermissions = {
  [ROLES.USER]: [PERMISSIONS.READ],
  [ROLES.EDITOR]: [PERMISSIONS.READ, PERMISSIONS.WRITE, PERMISSIONS.UPDATE],
  [ROLES.MODERATOR]: [
    PERMISSIONS.READ,
    PERMISSIONS.WRITE,
    PERMISSIONS.UPDATE,
    PERMISSIONS.DELETE,
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.READ,
    PERMISSIONS.WRITE,
    PERMISSIONS.UPDATE,
    PERMISSIONS.DELETE,
    PERMISSIONS.MANAGE_USERS,
  ],
};
