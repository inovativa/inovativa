'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserStarSchema extends Schema {
  up () {
    this.create('user_stars', (table) => {
      table.increments()
      table.string('avatar').notNullable()
      table.string('username').notNullable()
      table.string('whatsapp').notNullable()
      table.text('site').notNullable()
      table.text('linkedin').notNullable()
      table.text('city').notNullable()
      table.text('interesse').notNullable()
      table.text('uf').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_stars')
  }
}

module.exports = UserStarSchema
