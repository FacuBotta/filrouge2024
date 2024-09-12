/*
  Warnings:

  - You are about to drop the `_Participants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_Participants` DROP FOREIGN KEY `_Participants_A_fkey`;

-- DropForeignKey
ALTER TABLE `_Participants` DROP FOREIGN KEY `_Participants_B_fkey`;

-- DropTable
DROP TABLE `_Participants`;

-- CreateTable
CREATE TABLE `UserEvents` (
    `userId` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userId`, `eventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserEvents` ADD CONSTRAINT `UserEvents_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEvents` ADD CONSTRAINT `UserEvents_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
