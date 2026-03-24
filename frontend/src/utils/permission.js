// src/utils/permission.js

export const can = (permission) => {
    const storedPermissions = sessionStorage.getItem('permissions');

    if (!storedPermissions) return false;

    const permissions = JSON.parse(storedPermissions);

    return permissions.includes(permission);
};