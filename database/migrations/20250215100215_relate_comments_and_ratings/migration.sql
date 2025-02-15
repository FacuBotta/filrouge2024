/*
  Warnings:

  - A unique constraint covering the columns `[commentId]` on the table `Ratings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `commentId` to the `Ratings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ratings` ADD COLUMN `commentId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Ratings_commentId_key` ON `Ratings`(`commentId`);

-- AddForeignKey
ALTER TABLE `Ratings` ADD CONSTRAINT `Ratings_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
