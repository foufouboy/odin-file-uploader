import asyncHandler from "express-async-handler";
import passport from "passport";
import bcrypt from "bcryptjs";
import userModel from "../models/user";
import createError from "http-errors";

const user = {
    signup: {

        get: (req, res, next) => {
            // On render juste la page signup
            res.json({
                status: 200,
                message: "signup page",
            });
        },

        post: asyncHandler(async (req, res, next) => {
            const {
                username,
                email,
                password,
            } = req.body;

            try {
                const pwHash = await bcrypt.hash(req.body.password, 10);
                const user = await userModel.create(username, email, pwHash, "");

                res.json({
                    status: 200,
                    message: "user successfully created!",
                    user: user,
                });

            } catch (err) {
                console.error(err);
                return next(createError(500, err));
            }
        }),
    },

    login: {

        get: (req, res, next) => {
            // On render juste la page login
            if (req.user) {
                res.json({
                    status: 200,
                    message: "already logged in",
                    user: req.user,
                })
            } else {
                res.json({
                    status: 200,
                    message: "login page",
                });
            }
        },

        post: passport.authenticate("local", {
            successRedirect: "/login",
            failureRedirect: "/login",
        }),
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