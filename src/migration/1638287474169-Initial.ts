import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1638287474169 implements MigrationInterface {
    name = 'Initial1638287474169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sweet-hair-dev\`.\`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sweet-hair-dev\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role_id\` int NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sweet-hair-dev\`.\`item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`total\` float(11,2) NOT NULL, \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sweet-hair-dev\`.\`invoice\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`total\` float(11,2) NOT NULL, \`isReceived\` tinyint NOT NULL DEFAULT 0, \`idPaid\` tinyint NOT NULL DEFAULT 0, \`scheduledAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sweet-hair-dev\`.\`transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`total\` float(11,2) NOT NULL, \`isPaid\` tinyint NOT NULL DEFAULT 0, \`scheduledAt\` datetime NULL, \`customerId\` int NULL, \`appointmentId\` int NULL, \`invoiceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sweet-hair-dev\`.\`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`fullName\` varchar(255) NOT NULL DEFAULT '', \`location\` varchar(255) NULL DEFAULT '', \`about\` varchar(255) NULL DEFAULT '', \`email\` text NULL, \`instagram\` text NULL, UNIQUE INDEX \`IDX_3754c2e7c3d09be49ec5acbfb5\` (\`fullName\`), UNIQUE INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` (\`email\`), UNIQUE INDEX \`IDX_a8903a67432ff77c733fa6241c\` (\`instagram\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sweet-hair-dev\`.\`appointment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`scheduledAt\` datetime NOT NULL, \`title\` varchar(255) NULL DEFAULT '', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sweet-hair-dev\`.\`invoice_items\` (\`invoiceId\` int NOT NULL, \`itemId\` int NOT NULL, INDEX \`IDX_7fb6895fc8fad9f5200e91abb5\` (\`invoiceId\`), INDEX \`IDX_fa3401d21f40e33ebd8b693104\` (\`itemId\`), PRIMARY KEY (\`invoiceId\`, \`itemId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sweet-hair-dev\`.\`customer_appointments\` (\`customerId\` int NOT NULL, \`appointmentId\` int NOT NULL, INDEX \`IDX_b6afed7c4acdba35a8926ed079\` (\`customerId\`), INDEX \`IDX_37c50ef26c5b9c4b48e04d76fa\` (\`appointmentId\`), PRIMARY KEY (\`customerId\`, \`appointmentId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`user\` ADD CONSTRAINT \`FK_fb2e442d14add3cefbdf33c4561\` FOREIGN KEY (\`role_id\`) REFERENCES \`sweet-hair-dev\`.\`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`item\` ADD CONSTRAINT \`FK_37dc16b677ae822a94ab559d9b8\` FOREIGN KEY (\`customerId\`) REFERENCES \`sweet-hair-dev\`.\`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`transaction\` ADD CONSTRAINT \`FK_16ead8467f1f71ac7232aa46ad3\` FOREIGN KEY (\`customerId\`) REFERENCES \`sweet-hair-dev\`.\`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`transaction\` ADD CONSTRAINT \`FK_ccb316b4b0cc69c9f479af7cf0a\` FOREIGN KEY (\`appointmentId\`) REFERENCES \`sweet-hair-dev\`.\`appointment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`transaction\` ADD CONSTRAINT \`FK_17b930b7e4c1e8175fcb5ebca4b\` FOREIGN KEY (\`invoiceId\`) REFERENCES \`sweet-hair-dev\`.\`invoice\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`invoice_items\` ADD CONSTRAINT \`FK_7fb6895fc8fad9f5200e91abb59\` FOREIGN KEY (\`invoiceId\`) REFERENCES \`sweet-hair-dev\`.\`invoice\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`invoice_items\` ADD CONSTRAINT \`FK_fa3401d21f40e33ebd8b6931040\` FOREIGN KEY (\`itemId\`) REFERENCES \`sweet-hair-dev\`.\`item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`customer_appointments\` ADD CONSTRAINT \`FK_b6afed7c4acdba35a8926ed0798\` FOREIGN KEY (\`customerId\`) REFERENCES \`sweet-hair-dev\`.\`customer\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`customer_appointments\` ADD CONSTRAINT \`FK_37c50ef26c5b9c4b48e04d76fa2\` FOREIGN KEY (\`appointmentId\`) REFERENCES \`sweet-hair-dev\`.\`appointment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`customer_appointments\` DROP FOREIGN KEY \`FK_37c50ef26c5b9c4b48e04d76fa2\``);
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`customer_appointments\` DROP FOREIGN KEY \`FK_b6afed7c4acdba35a8926ed0798\``);
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`invoice_items\` DROP FOREIGN KEY \`FK_fa3401d21f40e33ebd8b6931040\``);
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`invoice_items\` DROP FOREIGN KEY \`FK_7fb6895fc8fad9f5200e91abb59\``);
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`transaction\` DROP FOREIGN KEY \`FK_17b930b7e4c1e8175fcb5ebca4b\``);
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`transaction\` DROP FOREIGN KEY \`FK_ccb316b4b0cc69c9f479af7cf0a\``);
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`transaction\` DROP FOREIGN KEY \`FK_16ead8467f1f71ac7232aa46ad3\``);
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`item\` DROP FOREIGN KEY \`FK_37dc16b677ae822a94ab559d9b8\``);
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`user\` DROP FOREIGN KEY \`FK_fb2e442d14add3cefbdf33c4561\``);
        await queryRunner.query(`DROP INDEX \`IDX_37c50ef26c5b9c4b48e04d76fa\` ON \`sweet-hair-dev\`.\`customer_appointments\``);
        await queryRunner.query(`DROP INDEX \`IDX_b6afed7c4acdba35a8926ed079\` ON \`sweet-hair-dev\`.\`customer_appointments\``);
        await queryRunner.query(`DROP TABLE \`sweet-hair-dev\`.\`customer_appointments\``);
        await queryRunner.query(`DROP INDEX \`IDX_fa3401d21f40e33ebd8b693104\` ON \`sweet-hair-dev\`.\`invoice_items\``);
        await queryRunner.query(`DROP INDEX \`IDX_7fb6895fc8fad9f5200e91abb5\` ON \`sweet-hair-dev\`.\`invoice_items\``);
        await queryRunner.query(`DROP TABLE \`sweet-hair-dev\`.\`invoice_items\``);
        await queryRunner.query(`DROP TABLE \`sweet-hair-dev\`.\`appointment\``);
        await queryRunner.query(`DROP INDEX \`IDX_a8903a67432ff77c733fa6241c\` ON \`sweet-hair-dev\`.\`customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` ON \`sweet-hair-dev\`.\`customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_3754c2e7c3d09be49ec5acbfb5\` ON \`sweet-hair-dev\`.\`customer\``);
        await queryRunner.query(`DROP TABLE \`sweet-hair-dev\`.\`customer\``);
        await queryRunner.query(`DROP TABLE \`sweet-hair-dev\`.\`transaction\``);
        await queryRunner.query(`DROP TABLE \`sweet-hair-dev\`.\`invoice\``);
        await queryRunner.query(`DROP TABLE \`sweet-hair-dev\`.\`item\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`sweet-hair-dev\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`sweet-hair-dev\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`sweet-hair-dev\`.\`role\``);
    }

}
