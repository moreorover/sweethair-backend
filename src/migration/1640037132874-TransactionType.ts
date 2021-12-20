import { MigrationInterface, QueryRunner } from 'typeorm';

export class TransactionType1640037132874 implements MigrationInterface {
  name = 'TransactionType1640037132874';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sweet-hair-dev\`.\`transaction\` ADD \`type\` enum ('IN', 'OUT') NOT NULL DEFAULT 'IN'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sweet-hair-dev\`.\`transaction\` DROP COLUMN \`type\``
    );
  }
}
