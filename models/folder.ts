import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const folderModel = {
    getFolderAndContent: async (id: string) => {
        const folder = await prisma.folder.findUnique({
            where: {
                id: id,
            },
            include: {
                files: true,
                childFolders: true,
            },
        });

        return folder;
    },

    createFolder: async (name: string, parentId: string, userId: string) => {
        const newFolder = await prisma.folder.create({ data: {
            name: name,
            parentId: parentId,
            userId: userId,
        }});

        return newFolder;
    },

    changeFolderName: async (id: string, name: string) => {
        const updatedFolder = await prisma.folder.update({
            where: {
                id: id,
            },
            data: {
                name: name,
            },
        });

        return updatedFolder;
    },

    deleteFolder: async (id: string) => {
        const response = await prisma.folder.delete({
            where: {
                id: id,
            },
        });

        return response;
    }
};

export default folderModel;