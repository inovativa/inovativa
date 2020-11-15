'use strict'
const Helpers = use('Helpers')
const Database = use("Database");
const Response = use('App/Models/Response')
const Artigo = use('App/Models/Artigo')

class ArtigoController {
    async indexAll({params,request}){
           const { uf }=request.all()
           if(uf==null){
            const res = await Database.select('*')
            .table('users')
            .leftJoin("artigos", "users.id","artigos.user_id")
        try {
           const { uf }=request.all()
           if(uf==null){
            const res = await Database.select('*')
            .table('users')
            .leftJoin("perfils", "users.perfil_id","perfils.id")
            .leftJoin("artigos", "users.id","artigos.user_id")
            .where('artigos.id','>',0)
            const list = res.map(item => {
                return {
                    id:item.id,
                    user_id:item.user_id,
                    date: item.created_at,
                    nome_perfil: item.nome_perfil,
                    username: item.username,
                    title: item.title,
                    description: item.description,
                    subtitle: item.subtitle,
                    avatar: `http://localhost:3333/${item.avatar}`,
                    avatar_user: `http://localhost:3333/${item.avatar_front}`,
                    uf_user:item.uf,
                    date: item.created_at
                    }
           })
               return Response.response(list, 200, "cadastrado com sucesso")
           }
            const res = await Database.select('*')

            .table('users')
            .leftJoin("artigos", "users.id","artigos.user_id")

            .table('users')
            .leftJoin("perfils", "users.perfil_id","perfils.id")
            .leftJoin("artigos", "users.id","artigos.user_id")
            .where('artigos.id','>',0)
            .where("users.uf",uf)
            const list = res.map(item => {
                return {
                    id:item.id,
                    user_id:item.user_id,
                    date: item.created_at,
                    nome_perfil: item.nome_perfil,
                    username: item.username,
                    title: item.title,
                    description: item.description,
                    subtitle: item.subtitle,
                    avatar: `http://localhost:3333/${item.avatar}`,
                    avatar_user: `http://localhost:3333/${item.avatar_front}`,
                    uf_user:item.uf,
                    date: item.created_at
                    }
          })
             return Response.response(list, 200, "cadastrado com sucesso")
           } catch (err) {
           return Response.response(err, 500, "error no cadastro")
       }
       }
   }


    async index({params,request}){
      console.log(params);
        try {
           const { uf }=request.all()
           if(uf==null){
            const res = await Database.select('*')
            .table('users')
            .leftJoin("perfils", "users.perfil_id","perfils.id")
            .leftJoin("artigos", "users.id","artigos.user_id")
            .where('artigos.id','>',0)
            .where('artigos.user_id',params.id)
            const list = res.map(item => {
                return {
                    id:item.id,
                    user_id:item.iuser_id,
                    date: item.created_at,
                    nome_perfil: item.nome_perfil,
                    username: item.username,
                    title: item.title,
                    description: item.description,
                    subtitle: item.subtitle,
                    avatar: `http://localhost:3333/${item.avatar}`,
                    avatar_user: `http://localhost:3333/${item.avatar_front}`,
                    uf_user:item.uf,
                    date: item.created_at
                    }
           })
               return Response.response(list, 200, "cadastrado com sucesso")
           }
            const res = await Database.select('*')
            .table('users')
            .leftJoin("perfils", "users.perfil_id","perfils.id")
            .leftJoin("artigos", "users.id","artigos.user_id")
            .where('artigos.id','>',0)
            .where('artigos.user_id',params.id)
            .where("users.uf",uf)
            const list = res.map(item => {
                return {
                    id:item.id,
                    user_id:item.user_id,
                    date: item.created_at,
                    nome_perfil: item.nome_perfil,
                    username: item.username,
                    title: item.title,
                    description: item.description,
                    subtitle: item.subtitle,
                    avatar: `http://localhost:3333/${item.avatar}`,
                    avatar_user: `http://localhost:3333/${item.avatar_front}`,
                    uf_user:item.uf,
                    date: item.created_at
                    }
          })
             return Response.response(list, 200, "cadastrado com sucesso")
         } catch (err) {
           return Response.response(err, 500, "error no cadastro")
       }
   }
    async indexOne({params}){
        try {
            const{ id }=params
           const item = await Database.select('*')
            .table('users')
            .leftJoin("perfils", "users.perfil_id","perfils.id")
            .leftJoin("artigos", "users.id","artigos.user_id")
            .where('artigos.id',id)
            const data = item.map(item => {
                return {
                    id:item.id,
                    user_id:item.user_id,
                    date: item.created_at,
                    nome_perfil: item.nome_perfil,
                    username: item.username,
                    title: item.title,
                    description: item.description,
                    subtitle: item.subtitle,
                    avatar: `http://localhost:3333/${item.avatar}`,
                    avatar_user: `http://localhost:3333/${item.avatar_front}`,
                    uf_user:item.uf,
                    date: item.created_at
                    }
          })
           return Response.response(data, 200, "cadastrado com sucesso")
         } catch (err) {
           return Response.response(err, 500, "não existe dado cadastro!")
       }
   }

   async create({ request,params }) {
       const {title, description,subtitle} = request.all()
       const validationOptions = {
           types: ['image'],
           size: '500mb',
           extnames: ['png', 'jpg', 'svg', 'gif', 'PNG', 'JPG', 'SVG', 'GIF']
       }
       try {

       const avatars = request.file('file', validationOptions)
       var avatar = `artigos/${new Date().getTime()}.${avatars.extname}`
           const res = await Artigo.create({
               user_id:params.id,
               avatar: avatar,
               subtitle: subtitle,
               title: title,
               description: description
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
     const res=await Artigo.query().where('id',id).delete()
     return Response.response(res, 200, "deletado com sucesso")
   }
}

module.exports = ArtigoController
