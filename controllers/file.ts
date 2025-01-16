import asyncHandler from "express-async-handler";
import { filesize } from "filesize";

import fileModel from "../models/file";
import upload from "../middlewares/multer";
import { uploadFile, getLongSignedUrl, uploadFileInFolder } from "../middlewares/supabase";
import { fileRenamingValidation, fileUploadValidation } from "../middlewares/validation";
import { validationResult } from "express-validator";

const file = {
    create: [
        upload.single("file"),
        fileUploadValidation,
        asyncHandler(async (req, res) => {
            // On valide le fichier, on le stocke dans Supabase,
            // on le crée dans File avec son lien. 
            // On redirect vers la page du dossier
            const file = req.file;
            const fileDestination = `${req.user.id}/${file?.originalname}`;

            const { data, error } = await uploadFileInFolder("files", fileDestination, file);
            const signedUrl = await getLongSignedUrl("files", fileDestination);

            const fileRow = await fileModel.create(
                file?.originalname, 
                filesize(file?.size, {standard: "jedec"}), 
                signedUrl,
                req.params.folder_id,
            );

            res.json({ 
                status: 200,
                file: fileRow,
            });
        })
    ],

    update: [
        fileRenamingValidation,
        asyncHandler(async (req, res) => {
            // On renomme le fichier
            // On redirect vers la page du dossier
            const errors = validationResult(req);
            
            if (!errors.isEmpty()) {
                res.status(400).json({
                    status: 400,
                    errors: errors.array(),
                });
            } else {
                const fileId = req.params.file_id;
                const { name, folderId } = req.body; 

                const updatedFile = await fileModel.update(fileId, name, folderId);

                res.json({ 
                    status: 200,
                    message: "File renamed successfully",
                    file: updatedFile,
                });
            }

        }),
    ],
    
    

    delete: asyncHandler(async (req, res) => {
        // On supprime le fichier
        // On redirect vers la page du dossier

        await fileModel.delete(req.params.file_id);

        res.json({ 
            status: 200,
            message: "File deleted successfully",
        });
    }),

}

export default file;