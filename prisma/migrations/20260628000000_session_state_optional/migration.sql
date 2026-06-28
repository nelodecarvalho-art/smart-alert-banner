-- AlterTable: make state nullable so OAuth callback sessions (state=null) can be stored
ALTER TABLE "Session" ALTER COLUMN "state" DROP NOT NULL;
