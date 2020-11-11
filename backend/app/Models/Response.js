'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Response extends Model {

    static response(data,status,massege){
        return{
            data:data,
            status:status,
            massege:massege
        }
    }
}

module.exports = Response
