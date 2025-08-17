/*
  Warnings:

  - Added the required column `Precio` to the `CitaServicio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CitaServicio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `citaservicio` ADD COLUMN `Precio` DOUBLE NOT NULL,
    ADD COLUMN `cantidad` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
