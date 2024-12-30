import session from "express-session"; 
import { PrismaClient } from "@prisma/client";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

const sessionConfig = () =>
    session({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000,
        },
        secret: "Milocibelle",
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(
            new PrismaClient,
            {
                checkPeriod: 2 * 60 * 1000,
                dbRecordIdFunction: undefined,
                dbRecordIdIsSessionId: true,
            }
        )
    });

export default sessionConfig;