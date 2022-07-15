/*
  Warnings:

  - Added the required column `password_id` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notes" ADD COLUMN     "password_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_password_id_fkey" FOREIGN KEY ("password_id") REFERENCES "passwords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
