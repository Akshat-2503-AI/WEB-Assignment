const authHandler = (req, res, next) => {
        // Public routes — skip auth check
        const publicRoutes = ["/", "/movies/add", "/movies/search"];

        if (publicRoutes.includes(req.path)) {
            return next();
        }

        // Placeholder: add real auth logic here (JWT, session, etc.)
        const isAuthenticated = true;   //global middleware for authentication

        if (!isAuthenticated) {
            return res.status(401).send("Unauthorized Access");
        }

        next();
    };

    module.exports = authHandler;
