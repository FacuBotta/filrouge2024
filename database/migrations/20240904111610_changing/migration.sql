-- AlterTable
ALTER TABLE `UserConversation` MODIFY `role` ENUM('CREATOR', 'GUEST') NOT NULL DEFAULT 'GUEST';
