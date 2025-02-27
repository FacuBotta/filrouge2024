-- DropForeignKey
ALTER TABLE `MessageStatus` DROP FOREIGN KEY `MessageStatus_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Ratings` DROP FOREIGN KEY `Ratings_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserConversation` DROP FOREIGN KEY `UserConversation_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserEvents` DROP FOREIGN KEY `UserEvents_userId_fkey`;

-- DropIndex
DROP INDEX `Ratings_userId_idx` ON `Ratings`;

-- AddForeignKey
ALTER TABLE `Ratings` ADD CONSTRAINT `Ratings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEvents` ADD CONSTRAINT `UserEvents_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserConversation` ADD CONSTRAINT `UserConversation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessageStatus` ADD CONSTRAINT `MessageStatus_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
