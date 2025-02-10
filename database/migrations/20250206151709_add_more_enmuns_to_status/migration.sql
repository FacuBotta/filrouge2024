/*
  Warnings:

  - The values [DECLINED] on the enum `UserInvitations_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `UserInvitations` MODIFY `status` ENUM('JOINED', 'WAITING_CREATOR_RESPONSE', 'WAITING_PARTICIPANT_RESPONSE', 'DECLINED_BY_CREATOR', 'DECLINED_BY_PARTICIPANT') NOT NULL DEFAULT 'WAITING_CREATOR_RESPONSE';
