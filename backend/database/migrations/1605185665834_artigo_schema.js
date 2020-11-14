'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArtigoSchema extends Schema {
  up () {
    this.create('artigos', (table) => {
      table.increments()
      table.string('avatar').notNullable()
      table.string('title').notNullable()
      table.string('subtitle').notNullable()
      table.text('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('artigos')
  }
}

module.exports = ArtigoSchema
