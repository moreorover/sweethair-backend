import { MigrationInterface, QueryRunner } from 'typeorm';

export class ItemInvoiceRelationship1638835607725 implements MigrationInterface {
    name = 'ItemInvoiceRelationship1638835607725';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`item\` ADD \`invoiceId\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sweet-hair-dev\`.\`item\` DROP COLUMN \`invoiceId\``);
    }
}
