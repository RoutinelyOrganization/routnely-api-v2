-- CreateEnum
CREATE TYPE "TaskCategories" AS ENUM ('Career', 'Finance', 'Studies', 'Health', 'Leisure', 'Productivity', 'Several');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('habit', 'task');

-- CreateEnum
CREATE TYPE "TaskTags" AS ENUM ('application', 'account', 'exercise', 'beauty', 'literature');

-- CreateEnum
CREATE TYPE "DaysOfWeek" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "finallyDate" TIMESTAMP(3),
    "category" "TaskCategories" NOT NULL,
    "type" "TaskType" NOT NULL,
    "weekDays" "DaysOfWeek"[],
    "account_id" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
