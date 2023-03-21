-- AlterTable
ALTER TABLE "College" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT,
ALTER COLUMN "Type" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;
