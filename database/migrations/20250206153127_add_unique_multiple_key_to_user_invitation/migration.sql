/*
  Warnings:

  - A unique constraint covering the columns `[userId,eventId]` on the table `UserInvitations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserInvitations_userId_eventId_key` ON `UserInvitations`(`userId`, `eventId`);
