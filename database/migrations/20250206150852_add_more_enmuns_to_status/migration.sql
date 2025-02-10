/*
  Warnings:

  - You are about to drop the column `status` on the `UserEvents` table. All the data in the column will be lost.
  - The values [WAITING_OWNER_RESPONSE] on the enum `UserInvitations_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `UserEvents` DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `UserInvitations` MODIFY `status` ENUM('JOINED', 'WAITING_CREATOR_RESPONSE', 'WAITING_PARTICIPANT_RESPONSE', 'DECLINED') NOT NULL DEFAULT 'WAITING_CREATOR_RESPONSE';
