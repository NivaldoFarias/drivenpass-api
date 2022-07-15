/*
  Warnings:

  - You are about to drop the column `number` on the `documents` table. All the data in the column will be lost.
  - Added the required column `registry_number` to the `documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `documents` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `emission_date` on the `documents` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `exp_date` on the `documents` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "enum_doc_types" AS ENUM ('RG', 'CNH');

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "number",
ADD COLUMN     "registry_number" TEXT NOT NULL,
ADD COLUMN     "type" "enum_doc_types" NOT NULL,
DROP COLUMN "emission_date",
ADD COLUMN     "emission_date" VARCHAR(10) NOT NULL,
DROP COLUMN "exp_date",
ADD COLUMN     "exp_date" VARCHAR(10) NOT NULL;

-- DropEnum
DROP TYPE "enum_document_types";
