'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Message extends Model {
    rooms(){
        return this.belongsTo('App/Models/Room')
    }
}

module.exports = Message
