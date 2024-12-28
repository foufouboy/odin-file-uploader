import asyncHandler from "express-async-handler";

const folder = {
    get: asyncHandler(async (req, res) => {
        // On va chercher le dossier, ses fichiers, et on les affiche,
        // (donc : on a besoin des données du folder)
        res.json({ 
            status: 200,
            message: "Folders read successfully",
        });
    }),

    create: asyncHandler(async (req, res) => {
        // On valide le nom du dossier,
        // on le crée dans Folder. 
        // On redirect vers la page du dossier parent
        res.json({ 
            status: 200,
            message: "Folder created successfully",
        });
    }),

    update: asyncHandler(async (req, res) => {
        // On renomme le dossier
        // On redirect vers la page du dossier parent
        res.json({ 
            status: 200,
            message: "Folder updated successfully",
        });
    }),

    delete: asyncHandler(async (req, res) => {
        // On supprime le dossier
        // On redirect vers la page du dossier parent
        res.json({ 
            status: 200,
            message: "Folder removed successfully",
        });
    }),

}

export default folder;