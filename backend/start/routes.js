'use strict'
const Helpers = use('Helpers')

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const fs = require('fs');

Route.post('/list','UserController.index')
Route.post('/list/:id','UserController.showOne')
Route.post('/create/:id','UserController.store')
Route.post('/update/:pf/:id','UserController.update')
Route.post('/login','UserController.login')
Route.post('/filesFront/:id','UserController.uploadFront')
Route.post('/filesBack/:id','UserController.uploadBack')

Route.get('/front/:id',async({params,response})=>{
    const {id}=params
    const photos=`front/${id}`
    return response.download(Helpers.tmpPath(photos))
})
Route.get('/back/:id',async({params,response})=>{
    const {id}=params
    const photos=`back/${id}`
    return response.download(Helpers.tmpPath(photos))
})

