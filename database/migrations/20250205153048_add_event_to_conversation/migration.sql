/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Conversation` ADD COLUMN `eventId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Conversation_eventId_key` ON `Conversation`(`eventId`);

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Events`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
