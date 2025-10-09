import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpperName1760009584634 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('UPDATE item SET name = upper(name)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('UPDATE item SET name = lower(name)');
  }
}
