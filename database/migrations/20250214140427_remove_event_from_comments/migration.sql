/*
  Warnings:

  - You are about to drop the column `eventId` on the `Comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_eventId_fkey`;

-- DropIndex
DROP INDEX `Comments_eventId_idx` ON `Comments`;

-- AlterTable
ALTER TABLE `Comments` DROP COLUMN `eventId`;
