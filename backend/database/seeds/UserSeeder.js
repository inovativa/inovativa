'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class UserSeeder {
  async run () {
    const data=[
      {nome:"Startup"},
      {nome:"Empresa"},
      {nome:"Investidor"},
      {nome:"Mentor"}
    ]
    for (var i = 0; i < data.length; i++) {
    await Database.table('perfils').insert({
         nome_perfil:data[i].nome,
       });
  }
 }
}

module.exports = UserSeeder
