/*
  Warnings:

  - You are about to drop the `wifi_networks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "wifi_networks" DROP CONSTRAINT "wifi_networks_password_id_fkey";

-- DropForeignKey
ALTER TABLE "wifi_networks" DROP CONSTRAINT "wifi_networks_user_id_fkey";

-- DropTable
DROP TABLE "wifi_networks";

-- CreateTable
CREATE TABLE "networks" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "password_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "networks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "networks" ADD CONSTRAINT "networks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "networks" ADD CONSTRAINT "networks_password_id_fkey" FOREIGN KEY ("password_id") REFERENCES "passwords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
