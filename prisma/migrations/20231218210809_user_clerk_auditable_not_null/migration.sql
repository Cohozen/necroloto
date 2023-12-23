/*
  Warnings:

  - Made the column `clerkCreatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `clerkUpdatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "clerkCreatedAt" SET NOT NULL,
ALTER COLUMN "clerkCreatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "clerkUpdatedAt" SET NOT NULL,
ALTER COLUMN "clerkUpdatedAt" SET DEFAULT CURRENT_TIMESTAMP;
