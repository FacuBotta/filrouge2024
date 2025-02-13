/*
  Warnings:

  - You are about to drop the column `uptadateAt` on the `MessageStatus` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Message_invitationId_key` ON `Message`;

-- AlterTable
ALTER TABLE `MessageStatus` DROP COLUMN `uptadateAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
