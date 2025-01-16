import asyncHandler from "express-async-handler";
import { redirectIfNotAuth } from "../middlewares/auth";
import folderModel from "../models/folder";

// get ROOT folder and display it in the dashboard 

const index = [
    redirectIfNotAuth,
    asyncHandler(async (req, res) => {

        const rootFolder = await folderModel.getRootFolder(req.user.id);
        res.status(200).json({
            status: 200,
            rootFolder: rootFolder,
            user: req.user,
        });
    }),
];




export default index;