import asyncHandler from "express-async-handler";
import { filesize } from "filesize";
import upload from "../middlewares/multer";
import { uploadFile, getLongSignedUrl } from "../middlewares/supabase";
import fileModel from "../models/file";

const defaultFolderId = "1e7ad927-ae74-404e-af4f-ab0c56b5c232";

const file = {
    create: [
        upload.single("avatar"),
        asyncHandler(async (req, res) => {
            // On valide le fichier, on le stocke dans Supabase,
            // on le crée dans File avec son lien. 
            // On redirect vers la page du dossier
            const file = req.file

            const { data, error } = await uploadFile("avatars", file);
            const signedUrl = await getLongSignedUrl("avatars", file?.originalname);
            const fileRow = await fileModel.create(
                file?.originalname, 
                filesize(file?.size, {standard: "jedec"}), 
                signedUrl,
                defaultFolderId,
            );

            res.json({ 
                status: 200,
                file: fileRow,
            });
        })
    ],

    update: asyncHandler(async (req, res) => {
        // On renomme le fichier
        // On redirect vers la page du dossier
        res.json({ 
            status: 200,
            message: "File renamed successfully",
        });
    }),

    delete: asyncHandler(async (req, res) => {
        // On supprime le fichier
        // On redirect vers la page du dossier
        res.json({ 
            status: 200,
            message: "File deleted successfully",
        });
    }),

}

export default file;