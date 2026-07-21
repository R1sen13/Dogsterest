/*
  Warnings:

  - A unique constraint covering the columns `[filename]` on the table `Publication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Publication_filename_key" ON "Publication"("filename");
