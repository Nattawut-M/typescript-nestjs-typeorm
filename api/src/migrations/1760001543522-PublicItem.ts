import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PublicItem1760001543521 implements MigrationInterface {
  private readonly logger = new Logger(PublicItem1760001543521.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    // this.logger.log('Up...');
    await queryRunner.query('UPDATE item SET is_public = 1');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Down...');
  }
}
