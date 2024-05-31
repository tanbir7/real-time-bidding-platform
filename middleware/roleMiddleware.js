// middleware/roleMiddleware.js
module.exports = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        console.log(req.user.role)
        return res.status(403).json({ message: 'Access forbidden' });
    }
    next();
};
