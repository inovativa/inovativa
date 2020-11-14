'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StarSchema extends Schema {
  up () {
    this.create('stars', (table) => {
      table.increments()
      table.integer('evento_id').notNullable()
      table.string('avatar').notNullable()
      table.string('address').notNullable()
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('stars')
  }
}

module.exports = StarSchema
