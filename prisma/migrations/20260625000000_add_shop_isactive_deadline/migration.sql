-- Migration: add shop (unique), isActive, deadline to BannerSetting
-- and set sensible defaults for existing rows before adding NOT NULL constraints.

-- Step 1: add nullable columns
ALTER TABLE "BannerSetting" ADD COLUMN "shop"    TEXT;
ALTER TABLE "BannerSetting" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "BannerSetting" ADD COLUMN "deadline" TEXT;

-- Step 2: backfill shop so we can add the UNIQUE constraint
-- (dev databases will have no rows, so this is a no-op in practice)
UPDATE "BannerSetting" SET "shop" = 'unknown-' || "id" WHERE "shop" IS NULL;

-- Step 3: recreate table with shop NOT NULL UNIQUE (SQLite doesn't support ADD CONSTRAINT)
CREATE TABLE "BannerSetting_new" (
    "id"              TEXT    NOT NULL PRIMARY KEY,
    "shop"            TEXT    NOT NULL UNIQUE,
    "bannerText"      TEXT    NOT NULL DEFAULT '🎉 Free shipping for customers in your state!',
    "targetState"     TEXT    NOT NULL DEFAULT 'CA',
    "showState"       BOOLEAN NOT NULL DEFAULT true,
    "backgroundColor" TEXT    NOT NULL DEFAULT '#ff6b00',
    "textColor"       TEXT    NOT NULL DEFAULT '#ffffff',
    "isActive"        BOOLEAN NOT NULL DEFAULT true,
    "deadline"        TEXT,
    "createdAt"       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "BannerSetting_new"
  SELECT "id", "shop", "bannerText", "targetState", "showState",
         "backgroundColor", "textColor", "isActive", "deadline",
         "createdAt", "updatedAt"
  FROM   "BannerSetting";

DROP TABLE "BannerSetting";
ALTER TABLE "BannerSetting_new" RENAME TO "BannerSetting";
