/*
  Warnings:

  - You are about to drop the column `secure_id` on the `author` table. All the data in the column will be lost.
  - You are about to drop the column `secure_id` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `secure_id` on the `category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "author" DROP COLUMN "secure_id";

-- AlterTable
ALTER TABLE "book" DROP COLUMN "secure_id";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "secure_id";
