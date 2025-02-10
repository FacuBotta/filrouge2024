/*
  Warnings:

  - Added the required column `conversationId` to the `UserInvitations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserInvitations` ADD COLUMN `conversationId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `UserInvitations` ADD CONSTRAINT `UserInvitations_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
