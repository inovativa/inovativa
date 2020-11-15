'use strict'
const Helpers = use('Helpers')

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const fs = require('fs');

Route.post('/list','UserController.index')
Route.post('/list/:id','UserController.showOne')
Route.post('/create/:id','UserController.store')
Route.post('/update/:user_id/:perfil_id','UserController.update')
Route.post('/login','UserController.login')
Route.post('/filesFront/:id','UserController.uploadFront')
Route.post('/filesBack/:id','UserController.uploadBack')

Route.post('/evento/:id','EventoController.create')
Route.post('/ListEvento','EventoController.index')
Route.post('/oneEvento/:id','EventoController.indexOne')
Route.delete('/deleteEvento/:id','EventoController.delete')

Route.post('/allstar','StarController.index')
Route.post('/star/:artigo_id/:user_id','StarController.create')
Route.post('/ListStar/:id','StarController.indexOne')

Route.post('/allUserStar','UserStarController.index')
Route.post('/Userstar/:user_id','UserStarController.create')
Route.post('/ListUserStar/:id','UserStarController.indexOne')

Route.post('/artigo','ArtigoController.indexAll')
Route.post('/artigo/:id','ArtigoController.index')
Route.post('/createArtigo/:id','ArtigoController.create')
Route.post('/OneArtigo/:id','ArtigoController.indexOne')
Route.delete('/deleteArtigo/:id','ArtigoController.delete')

Route.get('/artigos/:id',async({params,response})=>{
    const {id}=params
    const photos=`artigos/${id}`
    return response.download(Helpers.tmpPath(photos))
})
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
Route.get('/event/:id',async({params,response})=>{
    const {id}=params
    const photos=`event/${id}`
    return response.download(Helpers.tmpPath(photos))
})

//chat realtime

Route.post('/rooms', 'RoomController.create')
Route.post('/rooms/:id', 'RoomController.createMessage')