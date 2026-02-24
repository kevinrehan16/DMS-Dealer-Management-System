// src/utils/permission.js

export const can = (permission) => {
    const storedPermissions = localStorage.getItem('permissions');

    if (!storedPermissions) return false;

    const permissions = JSON.parse(storedPermissions);

    return permissions.includes(permission);
};