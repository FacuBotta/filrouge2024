/*
  Warnings:

  - You are about to alter the column `status` on the `MessageStatus` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `MessageStatus` MODIFY `status` ENUM('UNSEEN', 'SEEN') NOT NULL DEFAULT 'UNSEEN';