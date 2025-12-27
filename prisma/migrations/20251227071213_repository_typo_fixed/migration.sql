/*
  Warnings:

  - Changed the type of `githubId` on the `Repository` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Repository" DROP COLUMN "githubId",
ADD COLUMN     "githubId" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Repository_githubId_key" ON "Repository"("githubId");
