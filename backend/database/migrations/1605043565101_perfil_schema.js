'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PerfilSchema extends Schema {
  up () {
    this.create('perfils', (table) => {
      table.increments()
      table.string('nome_perfil').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('perfils')
  }
}

module.exports = PerfilSchema
