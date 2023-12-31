import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWalletTable1703988373013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'wallets',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
        },
        {
          name: 'userId',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'asset',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'derivation',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'address',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'secret',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    });
    await queryRunner.createTable(table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('wallets');
  }
}
