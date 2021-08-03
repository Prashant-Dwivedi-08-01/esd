import jwt from "jsonwebtoken";

export const checkOfficerAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const secret_key = req.headers.secret_key;

        const decodedData = jwt.verify(token, secret_key);

        req.userData = decodedData;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            status: "Failed",
            message: "Invalid token or Not Authorized"
        })
    }
}