import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PrivateItem1760005222324 implements MigrationInterface {
  private readonly logger = new Logger(PrivateItem1760005222324.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    // throw new Error('Method not implemented.');
    this.logger.log('Up...');
    const r = await queryRunner.query('UPDATE item SET is_public = 0;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Down...');
  }
}
