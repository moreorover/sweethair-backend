import { MigrationInterface, QueryRunner } from 'typeorm';

export class AppointmentItemRelationship1638397155783
  implements MigrationInterface
{
  name = 'AppointmentItemRelationship1638397155783';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sweet-hair-dev\`.\`item\` ADD \`appointmentId\` int NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sweet-hair-dev\`.\`item\` DROP COLUMN \`appointmentId\``,
    );
  }
}
