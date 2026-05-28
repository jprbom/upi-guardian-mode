import type { NextFunction, Request, Response } from 'express';

export type Role = 'ADMIN' | 'GUARDIAN_OPERATOR' | 'POLICY_MANAGER' | 'FAMILY_REVIEWER' | 'VIEWER';
export type Permission = 'read' | 'write' | 'admin';

const roles = [
  "ADMIN",
  "GUARDIAN_OPERATOR",
  "POLICY_MANAGER",
  "FAMILY_REVIEWER",
  "VIEWER"
] as Role[];
const defaultRole: Role = 'VIEWER';
const permissionsByRole: Record<Role, Permission[]> = {
  "ADMIN": [
    "read",
    "write",
    "admin"
  ],
  "GUARDIAN_OPERATOR": [
    "read",
    "write"
  ],
  "POLICY_MANAGER": [
    "read",
    "write"
  ],
  "FAMILY_REVIEWER": [
    "read"
  ],
  "VIEWER": [
    "read"
  ]
};

export function getRequestRole(req: Request): Role {
  const headerRole = req.header('x-user-role');
  return headerRole && roles.includes(headerRole as Role) ? headerRole as Role : defaultRole;
}

export function requirePermission(permission: Permission) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = getRequestRole(req);
    if (!permissionsByRole[role].includes(permission)) {
      res.status(403).json({ error: 'RBAC_DENIED', message: 'Role ' + role + ' cannot perform ' + permission + ' operations.', role });
      return;
    }
    next();
  };
}

export function roleCatalogue() {
  return roles.map((role) => ({ role, permissions: permissionsByRole[role] }));
}
