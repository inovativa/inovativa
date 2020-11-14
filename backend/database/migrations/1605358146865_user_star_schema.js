'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserStarSchema extends Schema {
  up () {
    this.table('user_stars', (table) => {
      // alter table
      table.string('empresa').notNullable()
    })
  }

  down () {
    this.table('user_stars', (table) => {
      // reverse alternations
    })
  }
}

module.exports = UserStarSchema
