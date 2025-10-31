/*
  Warnings:

  - You are about to drop the column `estatus` on the `cita` table. All the data in the column will be lost.
  - Added the required column `estatusId` to the `Cita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cita` DROP COLUMN `estatus`,
    ADD COLUMN `estatusId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Estatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Estatus_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_estatusId_fkey` FOREIGN KEY (`estatusId`) REFERENCES `Estatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
