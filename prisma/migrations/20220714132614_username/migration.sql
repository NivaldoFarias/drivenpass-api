/*
  Warnings:

  - Added the required column `username` to the `credentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "credentials" ADD COLUMN     "username" TEXT NOT NULL;
