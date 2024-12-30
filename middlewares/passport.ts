import { Strategy as LocalStrategy } from "passport-local";
import userModel from "../models/user";
import bcrypt from "bcryptjs";

const verifyCallback = async (username: string, password: string, done) => {
    try {
        const user = await userModel.getFromUname(username);

        if (!user) {
            return done(null, false, {message: "Username not found"});
        }

        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) {
            return done(null, false, {message: "Incorrect password"})
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
};

export default passport => {
    passport.use(new LocalStrategy(verifyCallback));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await userModel.getWithContent(id);

            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}