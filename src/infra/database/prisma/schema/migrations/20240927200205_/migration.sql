-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "accepted_at" DROP NOT NULL,
ALTER COLUMN "accepted_at" DROP DEFAULT;
