/*
  Warnings:

  - A unique constraint covering the columns `[invitationId]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Message_invitationId_key` ON `Message`(`invitationId`);

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_invitationId_fkey` FOREIGN KEY (`invitationId`) REFERENCES `UserInvitations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
