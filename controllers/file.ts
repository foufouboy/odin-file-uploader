import asyncHandler from "express-async-handler";

const file = {
    create: asyncHandler(async (req, res) => {
        // On valide le fichier, on le stocke dans Supabase,
        // on le crée dans File avec son lien. 
        // On redirect vers la page du dossier
        res.json({ 
            status: 200,
            message: "File created successfully",
        });
    }),

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