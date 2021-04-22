import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class createForeignKeys1619037504941
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'addresses',
      new TableForeignKey({
        name: 'ClientAdresses',
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('addresses', 'ClientAdresses');
  }
}
