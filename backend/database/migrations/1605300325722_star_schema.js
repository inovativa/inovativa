'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StarSchema extends Schema {
  up () {
    this.table('stars', (table) => {
      // alter table
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.table('stars', (table) => {
      // reverse alternations
    })
  }
}

module.exports = StarSchema
