import asyncHandler from "express-async-handler";
import passport from "passport";
import bcrypt from "bcryptjs";
import createError from "http-errors";

import { validationResult } from "express-validator";
import { avatarValidation, profileValidation } from "../middlewares/validation";
import { getLongSignedUrl, uploadFile } from "../middlewares/supabase";
import { redirectIfAuth } from "../middlewares/auth";
import folderModel from "../models/folder";
import userModel from "../models/user";
import upload from "../middlewares/multer";

const user = {
    signup: {

        get: [
            redirectIfAuth,
            (req, res, next) => {
                // On render juste la page signup
                res.json({
                    status: 200,
                    message: "signup page",
                });
            }
        ],

        post: asyncHandler(async (req, res, next) => {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.status(400).json({
                    status: 400,
                    errors: errors.array(),
                    redirect: "/signup",
                });
            } else {
                const {
                    username,
                    email,
                    password,
                } = req.body;

                const pwHash = await bcrypt.hash(password, 10);
                const user = await userModel.create(username, email, pwHash, "");
                const rootFolder = await folderModel.createRootFolder(user.id);

                res.json({
                    status: 200,
                    message: "user successfully created!",
                    user: user,
                    rootFolder: rootFolder,
                });
            }
        }),
    },

    login: {

        get: (req, res, next) => {
            // On render juste la page login
            res.render("pages/login");
        },

        post: passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
        }),
    },

    logout: (req, res, next) => {
        // On logout l'user avec passportjs
        req.logout(err => {
            if (err) return next(err);
            res.redirect("/");
        });
    },

    profile: {
        get: asyncHandler(async (req, res) => {
            // On affiche le profil utilisateur,

            res.json({
                status: 200,
                message: "profil page",
                user: req.user,
            });
        }),

        update: [
            upload.single("avatar"),
            avatarValidation,
            profileValidation,
            asyncHandler(async (req, res): Promise<any> => {
                // On opère juste les changements
                // ou bien avatar, nom, ou mot de passe (pq pas)
                // on redirect vers le profil
                // TODO: Supprimer l'avatar précédent de Supabase

                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        status: 400,
                        errors: errors.array(),
                        redirect: "/signup",
                    });
                } 

                const file = req.file;
                const {
                    username,
                    password,
                    email,
                } = req.body;

                const pwHash = await bcrypt.hash(password, 10);
                let user;

                if (file) {
                    await uploadFile("avatars", file);
                    const avatarLink = await getLongSignedUrl("avatars", file.originalname);
                    user = await userModel.update(req.user.id, username, email, pwHash, avatarLink);
                } else {
                    user = await userModel.update(req.user.id, username, email, pwHash, "");
                }

                res.json({
                    status: 200,
                    user: user,
                    file: file,
                    redirect: "/profile",
                });
            }),
        ],

        delete: asyncHandler(async (req, res) => {
            // On supprime l'utilisateur,
            // on redirect vers le dashboard déconnecté.
            const userId = req.user.id;

            req.logout(err => {
                if (err) return next(err);
                res.redirect("/");
            });

            await userModel.delete(userId);

            res.json({
                status: 200,
                message: "The user has been successfully deleted",
            });
        })
    }

}

export default user;