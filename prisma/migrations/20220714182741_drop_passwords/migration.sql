/*
  Warnings:

  - You are about to drop the column `password_id` on the `credentials` table. All the data in the column will be lost.
  - You are about to drop the column `password_id` on the `credit_cards` table. All the data in the column will be lost.
  - You are about to drop the column `password_id` on the `networks` table. All the data in the column will be lost.
  - You are about to drop the column `password_id` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the `passwords` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `credit_cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `networks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "credentials" DROP CONSTRAINT "credentials_password_id_fkey";

-- DropForeignKey
ALTER TABLE "credit_cards" DROP CONSTRAINT "credit_cards_password_id_fkey";

-- DropForeignKey
ALTER TABLE "networks" DROP CONSTRAINT "networks_password_id_fkey";

-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_password_id_fkey";

-- AlterTable
ALTER TABLE "credentials" DROP COLUMN "password_id",
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "credit_cards" DROP COLUMN "password_id",
ADD COLUMN     "password" VARCHAR(4) NOT NULL;

-- AlterTable
ALTER TABLE "networks" DROP COLUMN "password_id",
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notes" DROP COLUMN "password_id";

-- DropTable
DROP TABLE "passwords";
