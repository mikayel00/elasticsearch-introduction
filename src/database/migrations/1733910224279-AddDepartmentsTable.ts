import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDepartmentsTable1733910224279 implements MigrationInterface {
  name = 'AddDepartmentsTable1733910224279';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "departments"
(
    "id"          uuid                     NOT NULL DEFAULT uuid_generate_v4(),
    "created_at"  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at"  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "name"        character varying        NOT NULL,
    "description" character varying        NOT NULL,
    CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id")
)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "departments"`);
  }
}
