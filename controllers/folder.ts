import asyncHandler from "express-async-handler";
import folderModel from "../models/folder";
import createError from "http-errors";
import { validationResult } from "express-validator";
import { folderNameValidation } from "../middlewares/validation";

const folder = {
    get: asyncHandler(async (req, res) => {
        // On va chercher le dossier, ses fichiers, et on les affiche,
        // (donc : on a besoin des données du folder)
        const folderId = req.params.folder_id;
        const folder = await folderModel.getWithContent(folderId);

        res.json({ 
            status: 200,
            message: "Folder read successfully",
            folder: folder,
        });
    }),

    create: [
        folderNameValidation,
        asyncHandler(async (req, res) => {

            const errors = validationResult(req);
            const folderId = req.params.folder_id;

            if (!errors.isEmpty()) {
                res.status(400).json({
                    status: 400,
                    errors: errors.array(),
                    redirect: `/folders/${req.params.folder_id}`,
                });
            } else {
                const { name } = req.body;
                const newFolder = await folderModel.create(name, folderId, req.user.id);

                res.json({ 
                    status: 200,
                    message: "Folder created successfully",
                    folder: newFolder,
                });
            }
        }),
    ],

    update: [
        folderNameValidation,
        asyncHandler(async (req, res) => {

            // getting validation errors

            const errors = validationResult(req);
            const folderId = req.params.folder_id;

            if (!errors.isEmpty()) {
                res.status(400).json({
                    status: 400,
                    errors: errors.array(),
                    redirect: `/folders/${req.params.folder_id}`,
                });
            } else {

                // updating

                const { name, parentId } = req.body;
                const updatedFolder = await folderModel.update(folderId, name, parentId);

                // returning

                res.json({ 
                    status: 200,
                    message: "Folder created successfully",
                    folder: updatedFolder,
                });
            }
        }),
    ],

    delete: asyncHandler(async (req, res) => {

        await folderModel.delete(req.params.folder_id);

        res.json({ 
            status: 200,
            message: "Folder removed successfully",
        });
    }),

}

export default folder;