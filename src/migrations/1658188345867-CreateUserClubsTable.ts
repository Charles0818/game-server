import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserClubsTable1658188345867 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "user_clubs" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "user" uuid CONSTRAINT "FK_f8b4e90ca494e71d6e2e93bb230" REFERENCES "users"("id") NOT NULL,
        "club" uuid CONSTRAINT "FK_f9c4e90ca494e71d6e2e93bb230" REFERENCES "clubs"("id") NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_8502e5df5a31a229380e83e4f7e" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "clubs" uuid CONSTRAINT "FK_f8c4e90ca494e71d6f2e93bc220" REFERENCES "user_clubs"("id")`,
    );

    await queryRunner.query(
      `ALTER TABLE "clubs" ADD COLUMN IF NOT EXISTS "users" uuid CONSTRAINT "FK_f8c4e90ca494e71d6e2e93bc220" REFERENCES "user_clubs"("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_clubs"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "clubs"`);
    await queryRunner.query(`ALTER TABLE "clubs" DROP COLUMN "users"`);
  }
}
