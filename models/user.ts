import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const userModel = {
    getWithContent: async (id: string) => {

    },

    create: async (username: string, email: string, passwordHash: string, avatarLink: string) => {

    },

    update: async (
        id: string, 
        username: string, 
        email: string, 
        passwordHash: string, 
        avatarLink: string) => {

    },

    delete: async (id: string) => {

    },
};

export default userModel;