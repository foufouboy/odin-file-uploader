import { Router } from "express";
import createError from "http-errors";

import index from "../controllers";
import user from "../controllers/user";
import folder from "../controllers/folder";
import file from "../controllers/file";

import { 
    redirectIfAuth, 
    redirectIfNotAuth,
    errorIfNotAuth, 
} from "../middlewares/auth";

import { 
    folderNameValidation,
    profileValidation,
} from "../middlewares/validation";

const router = Router();

router.all("*", (req, res, next) => {
    if (req.user) res.locals.user = req.user;
    next();
});

// GET

router.get("/", redirectIfNotAuth, index);
router.get("/signup", redirectIfAuth, user.signup.get);
router.get("/login", redirectIfAuth, user.login.get);
router.get("/folders/:folder_id", errorIfNotAuth, folder.get);
router.get("/profile", redirectIfNotAuth, user.profile.get);

// POST 

router.post("/signup", profileValidation, user.signup.post);
router.post("/login", user.login.post);
router.post("/logout", user.logout);
router.post("/folders", folderNameValidation, folder.create);
router.post("/folders/:folder_id/files", file.create);

// PUT

router.put("/folders/:folder_id", folder.update);
router.put("/folders/:folder_id/files/:file_id", file.update);
router.put("/profile", user.profile.update);

// DELETE 

router.delete("/folders/:folder_id", folder.delete);
router.delete("/folders/:folder_id/files/:file_id", file.delete);
router.delete("/profile", user.profile.delete);

// 404 ERROR HANDLING 

router.all("*", (req, res, next) => {
    return next(createError(404, "This path does not exist!"));
});

export default router;
