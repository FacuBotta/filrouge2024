-- AlterTable
ALTER TABLE `Tasks` ADD COLUMN `eventId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Events`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
