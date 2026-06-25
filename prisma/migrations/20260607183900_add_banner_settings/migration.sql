-- CreateTable
CREATE TABLE "BannerSetting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bannerText" TEXT NOT NULL,
    "targetState" TEXT NOT NULL,
    "showState" BOOLEAN NOT NULL DEFAULT true,
    "backgroundColor" TEXT NOT NULL DEFAULT '#ff6b00',
    "textColor" TEXT NOT NULL DEFAULT '#ffffff',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
