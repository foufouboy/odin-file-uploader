import { body } from "express-validator";

const namingSizeError = "should be between 3 and 30 characters."
const unameFormatError = "should begin by a letter, and then only use alphanumeric characters, hyphens and underscores";

// What should be validated ?

// PROFILE VALIDATION
/* 
- l'username doit seulement contenir a à 9 et - et _ sans espace, pas plus de 30 car.
- l'email doit être un email valide
- le mot de passe doit comporter plus de 8 caractères (this is not good password validation btw)
*/

const profileValidation = [
    body("username")
        .trim()
        .isLength({min: 3, max: 30})
        .withMessage(`Username ${namingSizeError}`)
        .matches(/[a-zA-Z][a-zA-Z1-9-_]+/)
        .withMessage(unameFormatError)
        .escape(),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Invalid email.")
        .escape(),
    body("password")
        .trim()
        .isLength({min: 8})
        .withMessage("Password should be at least 8 characters long")
        .escape(),
    body("conf-password")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords do not match.")
        .escape(),
];

// AVATAR VALIDATION
/* 
- doit être une image (jpeg, jpg, png, gif)
- taille inférieure à 5mb
*/

const avatarValidation = 
    body("avatar")
        .custom((_, { req }) => {
            if (!req.file) return true;

            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!allowedTypes.includes(req.file.mimetype)) {
                return false;
            }

            if (req.file.size > 5 * 1024 * 1024) {// 5mb
                return false;
            }

            return true;
        })
        .withMessage("Avatar is not valid! (Either too large or not an image)");


// FILE UPLOAD VALIDATION
/*
- taille inférieure à 5mb
*/

const fileUploadValidation = 
    body("upload-file")
        .custom((_, { req }) => {
            if (!req.file) return false;

            if (req.file.size > 5 * 1024 * 1024) {// 5mb
                return false;
            }

            return true;
        })
        .withMessage("File is not valid! (Either too large or non existent)");

// FILE RENAMING VALIDATION
/*
- pas plus de 30 caractères (arbitraire)
(le découpage de l'extension se fait en parallèle)
*/

const fileRenamingValidation = 
    body("folder-name")
        .trim()
        .isLength({min: 3, max: 30})
        .withMessage(`Folder name ${namingSizeError}`)
        .escape();

// FOLDER NAMING VALIDATION
/*
- pas plus de 30 caractères (arbitraire)
*/

const folderNameValidation = 
    body("folder-name")
        .trim()
        .isLength({min: 3, max: 30})
        .withMessage(`Folder name ${namingSizeError}`)
        .escape();