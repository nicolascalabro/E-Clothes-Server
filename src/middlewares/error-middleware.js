export const errorHandler = (err, req, res, next) => {

    if (err.name === "CastError") {
        return res.status(400).json({message: "Invalid product id"});
    }

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({message: err.message || "Server Internal Error"});
};