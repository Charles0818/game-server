import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClubMessagesTable1658189264544
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "club_messages" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "message" text NOT NULL, 
        "author" uuid CONSTRAINT "FK_f8b4e90ca494e71d6e2e93bb211" REFERENCES "users"("id") NOT NULL,
        "club" uuid CONSTRAINT "FK_f9c4e10ca494e71d6e2e93bb230" REFERENCES "clubs"("id") NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_8502e5df5a30b229380e83e4f7e" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "club_messages"`);
  }
}
