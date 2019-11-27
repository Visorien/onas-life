function findNonEmptyObject(...objects) {
    return objects.find(o => Object.keys(o).length > 0) || {};
}

/**  @param {import('express').Request} req */
export const authenticateAdmin = (req, res, next) => {
    if (req.headers.authorization) {
        req.isAdmin = req.headers.authorization === `${process.env.ADMIN_LOGIN}:${process.env.ADMIN_PASSWORD}`;
    } else {
        req.isAdmin = (
            findNonEmptyObject(req.body, req.query).login === process.env.ADMIN_LOGIN &&
            findNonEmptyObject(req.body, req.query).password === process.env.ADMIN_PASSWORD
        );
    }

    next();
};
