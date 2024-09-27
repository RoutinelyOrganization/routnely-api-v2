/*
  Warnings:

  - Added the required column `acceptedTerms` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "acceptedTerms" BOOLEAN NOT NULL;
