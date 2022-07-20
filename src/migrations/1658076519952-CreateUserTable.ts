import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1658076519952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "firstName" text NOT NULL, 
        "lastName" text NOT NULL,
         "username" text, "email" text NOT NULL, 
         "phone" text NOT NULL, 
         "gender" character varying, 
         "avatar" text, 
         "password" varchar, 
         "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
         "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
         CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), 
         CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), 
         CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
