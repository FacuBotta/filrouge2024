/*
  Warnings:

  - You are about to drop the column `userId` on the `UserInvitations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[participantId,eventId]` on the table `UserInvitations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creatorId` to the `UserInvitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participantId` to the `UserInvitations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserInvitations` DROP FOREIGN KEY `UserInvitations_userId_fkey`;

-- DropIndex
DROP INDEX `UserInvitations_userId_eventId_key` ON `UserInvitations`;

-- AlterTable
ALTER TABLE `UserInvitations` DROP COLUMN `userId`,
    ADD COLUMN `creatorId` VARCHAR(191) NOT NULL,
    ADD COLUMN `participantId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserInvitations_participantId_eventId_key` ON `UserInvitations`(`participantId`, `eventId`);

-- AddForeignKey
ALTER TABLE `UserInvitations` ADD CONSTRAINT `UserInvitations_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
