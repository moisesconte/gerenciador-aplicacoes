-- CreateTable
CREATE TABLE `apps` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `actived` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app-checks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `app_id` VARCHAR(191) NOT NULL,
    `status` ENUM('ONLINE', 'OFFLINE') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `app-checks` ADD CONSTRAINT `app-checks_app_id_fkey` FOREIGN KEY (`app_id`) REFERENCES `apps`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
