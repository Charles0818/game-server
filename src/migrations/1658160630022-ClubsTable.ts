import { MigrationInterface, QueryRunner } from 'typeorm';

export class ClubsTable1658160630022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "clubs" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "name" text NOT NULL, 
        "max_members" integer NOT NULL DEFAULT '50', 
        "owner" uuid CONSTRAINT "FK_f8b4e90ca494e71d6e2e93bb220" REFERENCES "users"("id") NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_8502e5df5a30a229380e83e4f7e" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "clubs"`);
  }
}
