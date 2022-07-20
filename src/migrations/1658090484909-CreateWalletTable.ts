import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWalletTable1658090484909 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "wallets" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "soft_currency" double precision NOT NULL DEFAULT '0', 
        "hard_currency" double precision NOT NULL DEFAULT '0', 
        "user" uuid CONSTRAINT "FK_f7b4e90ca494e71d6e2e93bb220" REFERENCES "users"("id") NOT NULL, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "wallets"`);
  }
}
