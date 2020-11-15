'use strict'
const Helpers = use('Helpers')
const Database = use("Database");
const Response = use('App/Models/Response')
const Evento = use('App/Models/Evento')
class EventoController {

    async index({request}){
         try {
            const {uf}=request.all()
            if(uf==null){
                const res = await Database.select('*')
                .table('users')
                .leftJoin("eventos", "users.id","eventos.user_id")
                .leftJoin("perfils", "users.perfil_id","perfils.id")
                .where('eventos.id','>',0)
            const list = res.map(item => {
                return {
                    id:item.id,
                    user_id:item.user_id,
                    uf_user:item.uf,
                    city:item.city,
                    address: item.address,
                    title: item.title,
                    data: item.data,
                    hora: item.hora,
                    description: item.description,
                    avatar: `http://localhost:3333/${item.avatar}`,
                    nome_perfil: item.nome_perfil,
                    username: item.username,
                  }
            })
                return Response.response(list, 200, "cadastrado com sucesso")
            }
              const res = await Database.select('*')
                .table('users')
                .leftJoin("eventos", "users.id","eventos.user_id")
                .leftJoin("perfils", "users.perfil_id","perfils.id")
                .where('eventos.id','>',0)
                .where("users.uf",uf)
                const list = res.map(item => {
                return {
                    id:item.id,
                    uf_user:item.uf,
                    city:item.city,
                    address: item.address,
                    title: item.title,
                    description: item.description,
                    data: item.data,
                    hora: item.hora,
                    avatar: `http://localhost:3333/${item.avatar}`,
                    date: item.created_at,
                    nome_perfil: item.nome_perfil,
                    username: item.username,
                }
        })
                return Response.response(list, 200, "cadastrado com sucesso")
          } catch (err) {
            return Response.response(err, 500, "error no cadastro")
        }
    }
    async indexOne({ params }){
         try {
            const {id}=params
                const res = await Database.select('*')
                .table('users')
                .leftJoin("eventos", "users.id","eventos.user_id")
                .leftJoin("perfils", "users.perfil_id","perfils.id")
                .where('eventos.id',id)
            const list = res.map(item => {
                return {
                    id:item.id,
                    user_id:item.user_id,
                    address: item.address,
                    title: item.title,
                    description: item.description,
                    data: item.data,
                    hora: item.hora,
                    avatar: `http://localhost:3333/${item.avatar}`,
                    date: item.created_at,
                    nome_perfil: item.nome_perfil,
                    username: item.username,
                  }
            })
                return Response.response(list, 200, "cadastrado com sucesso")
        } catch (err) {
            return Response.response(err, 500, "error no cadastro")
        }
    }

    async create({ params,request }) {
        const {address, title, description,hora,data} = request.all()
        const validationOptions = {
            types: ['image'],
            size: '500mb',
            extnames: ['png', 'jpg', 'svg', 'gif', 'PNG', 'JPG', 'SVG', 'GIF']
        }
    try {
        const avatars = request.file('file', validationOptions)
        var avatar = `event/${new Date().getTime()}.${avatars.extname}`
            const res = await Evento.create({
                user_id:params.id,
                avatar: avatar,
                address: address,
                title: title,
                description: description,
                data: data,
                hora: hora
            })
            await avatars.move(Helpers.tmpPath(), {
                name: avatar,
                overwrite: true
             })

        if (!avatars.moved()) return avatars.error()
            return Response.response(res, 200, "cadastrado com sucesso")
         } catch (err) {
            return Response.response(err, 500, "error no cadastro")
        }
    }

   async delete({params}){
    const {id}=params
    const res=await Evento.query().where('id',id).delete()
    return Response.response(res, 200, "deletado com sucesso")
  }
}

module.exports = EventoController
