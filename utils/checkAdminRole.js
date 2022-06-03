

export const checkAdminRole = (roles) => {
    if (roles)
        return roles.includes('ADMIN')
}