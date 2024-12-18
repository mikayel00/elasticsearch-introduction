import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsersAndAdminTables1733403362658 implements MigrationInterface {
  name = 'AddUsersAndAdminTables1733403362658';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users"
(
    "id"                     uuid              NOT NULL DEFAULT uuid_generate_v4(),
    "email"                  character varying NOT NULL,
    "first_name"             character varying NOT NULL,
    "last_name"              character varying NOT NULL,
    "date_of_birth"          date              NOT NULL,
    "avatar_url"             text,
    "documents"              text array,
    "additional_information" text,
    CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
)`);
    await queryRunner.query(`CREATE TABLE "admins"
(
    "id"       uuid              NOT NULL DEFAULT uuid_generate_v4(),
    "email"    character varying NOT NULL,
    "password" character varying NOT NULL,
    CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id")
)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "admins"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
