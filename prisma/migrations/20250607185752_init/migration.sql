/*
  Warnings:

  - You are about to drop the `detalleordenvta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ordenventa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `detalleordenvta` DROP FOREIGN KEY `DetalleOrdenVta_NroOrdenVta_fkey`;

-- DropTable
DROP TABLE `detalleordenvta`;

-- DropTable
DROP TABLE `ordenventa`;

-- CreateTable
CREATE TABLE `laboratorios` (
    `codLab` INTEGER NOT NULL AUTO_INCREMENT,
    `razonSocial` VARCHAR(100) NOT NULL,
    `direccion` VARCHAR(200) NOT NULL,
    `telefono` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `contacto` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`codLab`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `especialidades` (
    `codEspec` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcionEsp` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`codEspec`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipos_medicamento` (
    `codTipoMed` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`codTipoMed`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicamentos` (
    `codMedicamento` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcionMed` VARCHAR(200) NOT NULL,
    `fechaFabricacion` DATETIME(3) NOT NULL,
    `fechaVencimiento` DATETIME(3) NOT NULL,
    `presentacion` VARCHAR(100) NOT NULL,
    `stock` INTEGER NOT NULL,
    `precioVentaUni` DECIMAL(10, 2) NOT NULL,
    `precioVentaPres` DECIMAL(10, 2) NOT NULL,
    `marca` VARCHAR(100) NOT NULL,
    `codTipoMed` INTEGER NOT NULL,
    `codEspec` INTEGER NOT NULL,
    `codLab` INTEGER NOT NULL,

    PRIMARY KEY (`codMedicamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ordenes_venta` (
    `nroOrdenVta` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaEmision` DATETIME(3) NOT NULL,
    `motivo` VARCHAR(200) NOT NULL,
    `situacion` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`nroOrdenVta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalle_orden_venta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nroOrdenVta` INTEGER NOT NULL,
    `codMedicamento` INTEGER NOT NULL,
    `descripcionMed` VARCHAR(200) NOT NULL,
    `cantidadRequerida` INTEGER NOT NULL,
    `laboratorio` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ordenes_compra` (
    `nroOrdenC` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaEmision` DATETIME(3) NOT NULL,
    `situacion` VARCHAR(50) NOT NULL,
    `total` DECIMAL(12, 2) NOT NULL,
    `codLab` INTEGER NOT NULL,
    `nroFacturaProv` VARCHAR(50) NULL,

    PRIMARY KEY (`nroOrdenC`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalle_orden_compra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nroOrdenC` INTEGER NOT NULL,
    `codMedicamento` INTEGER NOT NULL,
    `descripcion` VARCHAR(200) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `montoUni` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `medicamentos` ADD CONSTRAINT `medicamentos_codLab_fkey` FOREIGN KEY (`codLab`) REFERENCES `laboratorios`(`codLab`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medicamentos` ADD CONSTRAINT `medicamentos_codTipoMed_fkey` FOREIGN KEY (`codTipoMed`) REFERENCES `tipos_medicamento`(`codTipoMed`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medicamentos` ADD CONSTRAINT `medicamentos_codEspec_fkey` FOREIGN KEY (`codEspec`) REFERENCES `especialidades`(`codEspec`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalle_orden_venta` ADD CONSTRAINT `detalle_orden_venta_nroOrdenVta_fkey` FOREIGN KEY (`nroOrdenVta`) REFERENCES `ordenes_venta`(`nroOrdenVta`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalle_orden_venta` ADD CONSTRAINT `detalle_orden_venta_codMedicamento_fkey` FOREIGN KEY (`codMedicamento`) REFERENCES `medicamentos`(`codMedicamento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordenes_compra` ADD CONSTRAINT `ordenes_compra_codLab_fkey` FOREIGN KEY (`codLab`) REFERENCES `laboratorios`(`codLab`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalle_orden_compra` ADD CONSTRAINT `detalle_orden_compra_nroOrdenC_fkey` FOREIGN KEY (`nroOrdenC`) REFERENCES `ordenes_compra`(`nroOrdenC`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalle_orden_compra` ADD CONSTRAINT `detalle_orden_compra_codMedicamento_fkey` FOREIGN KEY (`codMedicamento`) REFERENCES `medicamentos`(`codMedicamento`) ON DELETE RESTRICT ON UPDATE CASCADE;
