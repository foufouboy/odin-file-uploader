import { Router } from "express";
import createError from "http-errors";
import index from "../controllers";
import user from "../controllers/user";
import folder from "../controllers/folder";
import file from "../controllers/file";

const router = Router();

// GET

router.get("/", index);
router.get("/signup", user.signup.get);
router.get("/login", user.login.get);
router.get("/folders/:folder_id", folder.get);
router.get("/profile", user.profile.get);

// POST 

router.post("/signup", user.signup.post);
router.post("/login", user.login.post);
router.post("/logout", user.logout);
router.post("/folders", folder.create);
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
