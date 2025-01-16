/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `folder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "folder_name_userId_key" ON "folder"("name", "userId");
