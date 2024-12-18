import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRolesTable1733981427308 implements MigrationInterface {
  name = 'AddRolesTable1733981427308';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "roles"
(
    "id"          uuid                     NOT NULL DEFAULT uuid_generate_v4(),
    "created_at"  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at"  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "name"        character varying        NOT NULL,
    "description" character varying        NOT NULL,
    "rights"      jsonb                    NOT NULL,
    CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
)`);
    await queryRunner.query(`ALTER TABLE "users" ADD "role_id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"
    FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role_id"`);
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
