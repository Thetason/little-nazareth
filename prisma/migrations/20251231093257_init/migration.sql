-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kakao_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "profile_image" TEXT,
    "phone" TEXT,
    "kakao_channel_added" BOOLEAN NOT NULL DEFAULT false,
    "kakao_channel_added_at" DATETIME,
    "marketing_agree" BOOLEAN NOT NULL DEFAULT false,
    "favorite_character" TEXT,
    "tumblbug_notify" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "users_kakao_id_key" ON "users"("kakao_id");
