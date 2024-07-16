/*
  Warnings:

  - Added the required column `cantidad` to the `Inventario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inventario` ADD COLUMN `cantidad` INTEGER NOT NULL;
