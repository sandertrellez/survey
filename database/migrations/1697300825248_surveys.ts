import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'surveys'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('client_id')
      table.string('customer_identification').notNullable()
      table.string('car_model').notNullable()
      table.smallint('factors_taken_into_account_when_purchasing').notNullable()
      table.smallint('test_drive_rating').notNullable()
      table.smallint('satisfaction_rating').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
