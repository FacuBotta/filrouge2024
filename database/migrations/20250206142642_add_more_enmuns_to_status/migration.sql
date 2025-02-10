/*
  Warnings:

  - You are about to alter the column `status` on the `UserInvitations` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `UserInvitations` MODIFY `status` ENUM('JOINED', 'WAITING_CREATOR_RESPONSE', 'WAITING_OWNER_RESPONSE', 'DECLINED') NOT NULL DEFAULT 'WAITING_CREATOR_RESPONSE';
