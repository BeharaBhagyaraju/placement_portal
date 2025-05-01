import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Optional: Log the token for debugging
        console.log("Token from cookies:", token);

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decoded.userId;
        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);
        return res.status(401).json({
            message: "Unauthorized - Invalid or expired token",
            success: false,
        });
    }
};

export default isAuthenticated;
