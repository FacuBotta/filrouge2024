/*
  Warnings:

  - You are about to drop the column `address` on the `Events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Events` DROP COLUMN `address`,
    ADD COLUMN `formattedAddress` VARCHAR(191) NULL,
    ADD COLUMN `lat` DOUBLE NULL,
    ADD COLUMN `lng` DOUBLE NULL,
    ADD COLUMN `url` VARCHAR(191) NULL,
    ADD COLUMN `vicinity` VARCHAR(191) NULL;
