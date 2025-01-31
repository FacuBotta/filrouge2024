/*
  Warnings:

  - You are about to drop the column `url` on the `Events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Events` DROP COLUMN `url`,
    ADD COLUMN `locationUrl` VARCHAR(191) NULL;
