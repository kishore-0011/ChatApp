import jwt from 'jsonwebtoken'; 
import User from '../models/user.model.js';
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Not Authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Not Authorized" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Not Authorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error);
        res.status(401).json({ message: "Not Authorized" });
    }
}

export default protectRoute;
// In the above snippet, we have created a middleware function protectRoute that will be used to protect the routes that require authentication. The protectRoute function will check if the user is authenticated by verifying the JWT token passed in the request cookie. If the token is valid, it will decode the token and extract the user id from it. It will then find the user in the database using the user id and attach the user object to the request object. If the user is not found or the token is invalid, it will return a 401 status code with a message "Not Authorized". If there is any error during the process, it will return a 401 status code with a message "Not Authorized".