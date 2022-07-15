-- CreateEnum
CREATE TYPE "enum_document_types" AS ENUM ('RG', 'CNH');

-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "emission_date" TIMESTAMP(3) NOT NULL,
    "exp_date" TIMESTAMP(3) NOT NULL,
    "number" TEXT NOT NULL,
    "issuing_agency" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
