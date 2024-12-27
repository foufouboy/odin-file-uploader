import { Router } from "express";

const router = Router();
const mockResponse = (req, res, next) => {
    res.json({status: 200, message: "Everything working!"});
}

// GET

router.get("/", mockResponse);
router.get("/signup", mockResponse);
router.get("/login", mockResponse);
router.get("/folders/:folder_id", mockResponse);
router.get("/folders/:folder_id/files/:file_id", mockResponse);
router.get("/profile", mockResponse);

// POST 

router.post("/signup", mockResponse);
router.post("/login", mockResponse);
router.post("/folders", mockResponse);
router.post("/folders/:folder_id/files", mockResponse);

// PUT

router.put("/folders/:folder_id", mockResponse);
router.put("/folders/:folder_id/files/:filed_id", mockResponse);
router.put("/profile", mockResponse);

// DELETE 

router.delete("/folders/:folder_id", mockResponse);
router.delete("/folders/:folder_id/files/:file_id", mockResponse);
router.delete("/profile", mockResponse);

export default router;
