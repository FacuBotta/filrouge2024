-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_invitationId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `UserInvitations` DROP FOREIGN KEY `UserInvitations_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `UserInvitations` DROP FOREIGN KEY `UserInvitations_participantId_fkey`;

-- DropIndex
DROP INDEX `Message_invitationId_fkey` ON `Message`;

-- DropIndex
DROP INDEX `UserInvitations_eventId_fkey` ON `UserInvitations`;

-- AddForeignKey
ALTER TABLE `UserInvitations` ADD CONSTRAINT `UserInvitations_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInvitations` ADD CONSTRAINT `UserInvitations_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_invitationId_fkey` FOREIGN KEY (`invitationId`) REFERENCES `UserInvitations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
