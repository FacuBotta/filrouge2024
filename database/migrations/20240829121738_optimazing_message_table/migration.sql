/*
  Warnings:

  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `_ReceivedMessages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_userId_fkey`;

-- DropForeignKey
ALTER TABLE `_ReceivedMessages` DROP FOREIGN KEY `_ReceivedMessages_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ReceivedMessages` DROP FOREIGN KEY `_ReceivedMessages_B_fkey`;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `userId`;

-- DropTable
DROP TABLE `_ReceivedMessages`;
