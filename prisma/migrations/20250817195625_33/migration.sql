/*
  Warnings:

  - You are about to drop the column `Precio` on the `citaservicio` table. All the data in the column will be lost.
  - Added the required column `precio` to the `CitaServicio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `citaservicio` DROP COLUMN `Precio`,
    ADD COLUMN `precio` DOUBLE NOT NULL;
