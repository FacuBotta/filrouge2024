/*
  Warnings:

  - You are about to drop the column `userId` on the `Comments` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_userId_fkey`;

-- DropIndex
DROP INDEX `Comments_userId_idx` ON `Comments`;

-- AlterTable
ALTER TABLE `Comments` DROP COLUMN `userId`,
    ADD COLUMN `authorId` VARCHAR(191) NOT NULL,
    ADD COLUMN `recipientId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Comments_authorId_idx` ON `Comments`(`authorId`);

-- CreateIndex
CREATE INDEX `Comments_recipientId_idx` ON `Comments`(`recipientId`);

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_recipientId_fkey` FOREIGN KEY (`recipientId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
