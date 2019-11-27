/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const onlyAdmin = (req, res, next) => {
    if (!req.isAdmin) {
        res.sendStatus(403);
    } else {
        next();
    }
};
