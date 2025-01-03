import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const folderModel = {
    getWithContent: async (id: string) => {
        const folder = await prisma.folder.findUnique({
            where: { id: id },
            include: {
                files: true,
                childFolders: true,
            },
        });

        return folder;
    },

    create: async (name: string, parentId: string, userId: string) => {
        const newFolder = await prisma.folder.create({ data: {
            name: name,
            parentId: parentId,
            userId: userId,
        }});

        return newFolder;
    },

    update: async (id: string, name: string, parentId: string) => {
        const updatedFolder = await prisma.folder.update({
            where: { id: id },
            data: {name: name, parentId: parentId}, 
        });

        return updatedFolder;
    },

    delete: async (id: string) => {
        const response = await prisma.folder.delete({
            where: { id: id },
        });

        return response;
    }
};

export default folderModel;