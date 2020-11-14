'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArtigoSchema extends Schema {
  up () {
    this.table('artigos', (table) => {
      // alter table
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.table('artigos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ArtigoSchema
