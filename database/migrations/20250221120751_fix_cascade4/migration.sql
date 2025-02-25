-- DropForeignKey
ALTER TABLE `Tasks` DROP FOREIGN KEY `Tasks_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `Tasks` DROP FOREIGN KEY `Tasks_userId_fkey`;

-- DropIndex
DROP INDEX `Tasks_eventId_fkey` ON `Tasks`;

-- DropIndex
DROP INDEX `Tasks_userId_fkey` ON `Tasks`;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
