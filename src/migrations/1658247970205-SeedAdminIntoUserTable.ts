import { adminUser } from 'src/user/data/adminUser.seeder';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedAdminIntoUserTable1658247970205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const [adminExist] = await queryRunner.query(
      ` SELECT * FROM "users"
        WHERE email = '${adminUser.email}'
      `,
    );
    console.log(adminExist);
    if (!adminExist) {
      const [admin] = await queryRunner.query(
        `INSERT INTO "users" (
          "firstName",
          "lastName",
          "username",
          "email",
          "phone",
          "password" 
        ) VALUES (
          '${adminUser.firstName}',
          '${adminUser.lastName}',
          '${adminUser.username}',
          '${adminUser.email}',
          '${adminUser.phone}',
          '${bcrypt.hashSync(adminUser.password, 11)}'
        ) RETURNING *`,
      );

      await queryRunner.query(
        `INSERT INTO "wallets" (
          "user"
        ) VALUES (
          '${admin.id}'
        )`,
      );
    }
  }

  public async down(): Promise<void> {
    return;
  }
}
