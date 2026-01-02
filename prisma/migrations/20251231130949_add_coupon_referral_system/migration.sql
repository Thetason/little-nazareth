-- CreateTable
CREATE TABLE "coupons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "used_at" DATETIME,
    "expires_at" DATETIME,
    "user_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "coupons_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "referrals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "referrer_id" INTEGER NOT NULL,
    "referred_id" INTEGER NOT NULL,
    "reward_claimed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "referrals_referrer_id_fkey" FOREIGN KEY ("referrer_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "referrals_referred_id_fkey" FOREIGN KEY ("referred_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "system_settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updated_at" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
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
    "early_bird_coupon_used" BOOLEAN NOT NULL DEFAULT false,
    "referral_code" TEXT,
    "referred_by" TEXT,
    "referral_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("created_at", "email", "favorite_character", "id", "kakao_channel_added", "kakao_channel_added_at", "kakao_id", "last_login", "marketing_agree", "name", "phone", "profile_image", "tumblbug_notify") SELECT "created_at", "email", "favorite_character", "id", "kakao_channel_added", "kakao_channel_added_at", "kakao_id", "last_login", "marketing_agree", "name", "phone", "profile_image", "tumblbug_notify" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_kakao_id_key" ON "users"("kakao_id");
CREATE UNIQUE INDEX "users_referral_code_key" ON "users"("referral_code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "coupons_code_key" ON "coupons"("code");

-- CreateIndex
CREATE UNIQUE INDEX "referrals_referrer_id_referred_id_key" ON "referrals"("referrer_id", "referred_id");

-- CreateIndex
CREATE UNIQUE INDEX "system_settings_key_key" ON "system_settings"("key");
