/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `user_profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_profile_email_key" ON "user_profile"("email");
