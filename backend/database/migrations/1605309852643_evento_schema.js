'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventoSchema extends Schema {
  up () {
    this.table('eventos', (table) => {
      // alter table
      table.integer('dia').unsigned().notNullable().after('description')
      table.integer('mes').unsigned().notNullable().after('dia')
      table.integer('ano').unsigned().notNullable().after('mes')
      table.integer('hora').unsigned().notNullable().after('ano')
      table.integer('minuto').unsigned().notNullable().after('hora')
    })
  }

  down () {
    this.table('eventos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = EventoSchema
