/*
  Warnings:

  - You are about to drop the column `category_id` on the `passwords` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_user_id_fkey";

-- DropForeignKey
ALTER TABLE "passwords" DROP CONSTRAINT "passwords_category_id_fkey";

-- AlterTable
ALTER TABLE "passwords" DROP COLUMN "category_id";

-- DropTable
DROP TABLE "categories";

-- CreateTable
CREATE TABLE "credentials" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "password_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_cards" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "number" VARCHAR(16) NOT NULL,
    "exp_date" VARCHAR(5) NOT NULL,
    "cvc" VARCHAR(3) NOT NULL,
    "is_virtual" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "password_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "credit_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wifi_networks" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "password_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wifi_networks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "credit_cards_label_key" ON "credit_cards"("label");

-- CreateIndex
CREATE UNIQUE INDEX "wifi_networks_label_key" ON "wifi_networks"("label");

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_password_id_fkey" FOREIGN KEY ("password_id") REFERENCES "passwords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_cards" ADD CONSTRAINT "credit_cards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_cards" ADD CONSTRAINT "credit_cards_password_id_fkey" FOREIGN KEY ("password_id") REFERENCES "passwords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wifi_networks" ADD CONSTRAINT "wifi_networks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wifi_networks" ADD CONSTRAINT "wifi_networks_password_id_fkey" FOREIGN KEY ("password_id") REFERENCES "passwords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
