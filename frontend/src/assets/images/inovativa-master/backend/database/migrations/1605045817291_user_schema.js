'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('empresa')
      table.string('whatsapp')
      table.string('site')
      table.string('linkedin')
      table.text('descricao_empresa').notNullable()
      table.string('city').notNullable()
      table.text('interesse').notNullable()
      table.string('uf').notNullable()
      table.integer('perfil_id').unsigned().references('id').inTable('perfils')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
