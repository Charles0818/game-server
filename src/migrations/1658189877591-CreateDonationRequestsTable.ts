import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDonationRequestsTable1658189877591
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "donation_requests" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "issuer" uuid CONSTRAINT "FK_f1b4e90ca494e71d6e2e93bb211" REFERENCES "users"("id") NOT NULL,
        "club" uuid CONSTRAINT "FK_f9d4e10ca494e71d6e2e93bb230" REFERENCES "clubs"("id") NOT NULL,
        "donor" uuid CONSTRAINT "FK_f1c4e90ca494e71d6e2e93bb211" REFERENCES "users"("id"),
        "soft_currency" float8 NOT NULL,
        "fulfilled" boolean DEFAULT FALSE,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_8502e5df5a30b229381e83e4f7e" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "donation_requests"`);
  }
}
