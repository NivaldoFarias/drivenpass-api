/*
  Warnings:

  - Added the required column `owner` to the `credit_cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "credit_cards" ADD COLUMN     "owner" TEXT NOT NULL;
