import createError from "http-errors";

const redirectIfNotAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}

const redirectIfAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect("/");
    } else {
        next();
    }
}

const errorIfNotAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        next(createError(401, "You are not authorized to see that page!"));
    }
}

export {
    errorIfNotAuth,
    redirectIfNotAuth,
    redirectIfAuth,
};