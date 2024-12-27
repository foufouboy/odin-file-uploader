import asyncHandler from "express-async-handler";

const user = {
    signup: {

        get: (req, res, next) => {
            // On render juste la page signup
            res.json({
                status: 200,
                message: "signup page",
            });
        },

        post: asyncHandler(async (req, res) => {
            // On crée un user,
            // on dit qu'il peut maintenant se connecter
            // (ou on redirect vers login)
            res.json({
                status: 200,
                message: "A user has been successfully created",
            });
        }),
    },

    login: {

        get: (req, res, next) => {
            // On render juste la page login
            res.json({
                status: 200,
                message: "login page",
            });
        },

        post: (req, res, next) => {
            // passport.authenticate
            res.json({
                status: 200,
                message: "A user has been successfully authenticated",
            });
        }
    },

    logout: (req, res, next) => {
        // On logout l'user avec passportjs
        res.json({
            status: 200,
            message: "A user has been successfully authenticated",
        });
    },

    profile: {
        get: asyncHandler(async (req, res) => {
            // On affiche le profil utilisateur,

            res.json({
                status: 200,
                message: "profil page",
            });
        }),

        update: asyncHandler(async (req, res) => {
            // On opère juste les changements
            // ou bien avatar, nom, ou mot de passe (pq pas)
            // on redirect vers le profil
            res.json({
                status: 200,
                message: "The user has been successfully updated",
            });
        }),

        delete: asyncHandler(async (req, res) => {
            // On supprime l'utilisateur,
            // on redirect vers le dashboard déconnecté.
            res.json({
                status: 200,
                message: "The user has been successfully deleted",
            });
        })
    }

}

export default user;