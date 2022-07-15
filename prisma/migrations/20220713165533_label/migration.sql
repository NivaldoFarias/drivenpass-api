/*
  Warnings:

  - You are about to drop the column `last_updated` on the `credentials` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `credentials` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[label]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `credentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "credentials" DROP COLUMN "last_updated",
DROP COLUMN "title",
ADD COLUMN     "label" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "credentials_label_key" ON "credentials"("label");
