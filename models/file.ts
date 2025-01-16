import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const fileModel = {
    create: async (name: string, size: string, link: string, folderId: string) => {
        const file = await prisma.file.create({ data: {
            name: name,
            size: size,
            link: link,
            folderId: folderId,
        }});

        return file;
    },

    update: async (id: string, name: string, folderId: string) => {
        const file = await prisma.file.update({
            where: { id: id },
            data: {
                name: name,
                folderId: folderId,
            }
        });

        return file;
    },

    delete: async (id: string) => {
        const response = await prisma.file.delete({ where: { id: id } });
        
        return response;
    },

    isFileInFolder: async (fileName: string, folderId: string) => {
        const file = await prisma.file.findFirst({
            where: {
                name: fileName,
                folderId: folderId,
            }
        });

        return file;
    }
};

export default fileModel;