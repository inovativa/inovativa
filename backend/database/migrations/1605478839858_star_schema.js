'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StarSchema extends Schema {
  up () {
    this.table('stars', (table) => {
      // alter table
      table.integer('artigo_id').notNullable()
    })
  }

  down () {
    this.table('stars', (table) => {
      // reverse alternations
    })
  }
}

module.exports = StarSchema
