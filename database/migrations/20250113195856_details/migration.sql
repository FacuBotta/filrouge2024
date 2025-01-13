/*
  Warnings:

  - You are about to drop the column `eventId` on the `Ratings` table. All the data in the column will be lost.
  - You are about to drop the column `reason` on the `Trash` table. All the data in the column will be lost.
  - You are about to drop the column `ranting` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Ratings` DROP FOREIGN KEY `Ratings_eventId_fkey`;

-- AlterTable
ALTER TABLE `Ratings` DROP COLUMN `eventId`;

-- AlterTable
ALTER TABLE `Trash` DROP COLUMN `reason`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `ranting`;
