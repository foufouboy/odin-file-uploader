import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const userModel = {
    getWithContent: async (id: string) => {
        const user = await prisma.user.findUnique({
            where: {id: id}
        });

        return user;
    },

    create: async (username: string, email: string, passwordHash: string, avatarLink: string) => {
        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                passwordHash: passwordHash,
                avatarLink: avatarLink,
            }
        });

        return user;
    },

    update: async (
        id: string, 
        username: string, 
        email: string, 
        passwordHash: string, 
        avatarLink: string) => {

            const user = await prisma.user.update({
                where: { id: id },
                data: {
                    username: username,
                    email: email,
                    passwordHash: passwordHash,
                    avatarLink: avatarLink,
                }
            });

            return user;

    },

    delete: async (id: string) => {
        const response = await prisma.user.delete({ where: { id: id } });

        return response;
    },
};

userModel.create("Milocibelle", "milo@cibelle.plouf", "une_petite_fee", "");

export default userModel;