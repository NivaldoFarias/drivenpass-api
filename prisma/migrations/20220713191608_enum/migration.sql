/*
  Warnings:

  - You are about to drop the column `title` on the `notes` table. All the data in the column will be lost.
  - Changed the type of `type` on the `credit_cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `label` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "enum_card_types" AS ENUM ('CREDIT', 'DEBIT', 'BOTH');

-- DropIndex
DROP INDEX "credentials_label_key";

-- DropIndex
DROP INDEX "credit_cards_label_key";

-- DropIndex
DROP INDEX "wifi_networks_label_key";

-- AlterTable
ALTER TABLE "credit_cards" DROP COLUMN "type",
ADD COLUMN     "type" "enum_card_types" NOT NULL;

-- AlterTable
ALTER TABLE "notes" DROP COLUMN "title",
ADD COLUMN     "label" TEXT NOT NULL;
