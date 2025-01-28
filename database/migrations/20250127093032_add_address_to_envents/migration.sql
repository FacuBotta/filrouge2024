/*
  Warnings:

  - You are about to drop the column `GoogleMaps` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `place` on the `Events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Events` DROP COLUMN `GoogleMaps`,
    DROP COLUMN `city`,
    DROP COLUMN `place`,
    ADD COLUMN `address` JSON NULL,
    MODIFY `eventEnd` DATETIME(3) NULL;
