'use strict'
const User = use('App/Models/User')
const Profil = use('App/Models/Perfil')
const Response = use('App/Models/Response')
const Helpers = use('Helpers')
const Database = use("Database");
class UserController {

    async index({request}) {
       try {
            const { uf } = request.all()
            
         if (uf == null) {
            const res = await Database.select('*')
                .table('perfils')
                .leftJoin("users", "perfils.id", "users.perfil_id")
                .where('users.id', '>', 0)
            const list = res.map(item => {
                return {
                    id: item.id,
                    perfil_id: item.perfil_id,
                    nome_perfil: item.nome_perfil,
                    username: item.username,
                    email: item.email,
                    password: item.password,
                    empresa: item.empresa,
                    whatsapp: item.whatsapp,
                    site: item.site,
                    linkedin: item.linkedin,
                    descricao_empresa: item.descricao_empresa,
                    city: item.city,
                    uf: item.uf,
                    interesse: item.interesse,
                    avatar_front: `http://localhost:3333/${item.avatar_front}`,
                    avatar_back: `http://localhost:3333/${item.avatar_back}`,
                    date: item.created_at
                }
            })
            return Response.response(list, 200, "cadastrado com sucesso")
            }
            const res = await Database.select('*')
                .table('perfils')
                .leftJoin("users", "perfils.id", "users.perfil_id")
                .where('users.id', '>', 0)
                .where("users.uf",uf) 
            const list = res.map(item => {
                return {
                    id: item.id,
                    perfil_id: item.perfil_id,
                    nome_perfil: item.nome_perfil,
                    username: item.username,
                    email: item.email,
                    password: item.password,
                    empresa: item.empresa,
                    whatsapp: item.whatsapp,
                    site: item.site,
                    linkedin: item.linkedin,
                    descricao_empresa: item.descricao_empresa,
                    city: item.city,
                    uf: item.uf,
                    interesse: item.interesse,
                    avatar_front: `http://localhost:3333/${item.avatar_front}`,
                    avatar_back: `http://localhost:3333/${item.avatar_back}`,
                    date: item.created_at
                }
            })
            return Response.response(list, 200, "cadastrado com sucesso")
          } catch (err) {
            return Response.response(err, 500, "error no cadastro")
        } 
    }

    async showOne({ params,request }) {
        try {
            const { id } = params
            const res = await Database.select('*')
                .table('perfils')
                .leftJoin("users", "perfils.id", "users.perfil_id")
                .where("users.id", id)
            const list = res.map(item => {
                return {
                    id: item.id,
                    perfil_id: item.perfil_id,
                    nome_perfil: item.nome_perfil,
                    username: item.username,
                    email: item.email,
                    password: item.password,
                    empresa: item.empresa,
                    whatsapp: item.whatsapp,
                    site: item.site,
                    linkedin: item.linkedin,
                    descricao_empresa: item.descricao_empresa,
                    city: item.city,
                    uf: item.uf,
                    interesse: item.interesse,
                    avatar_front: `http://localhost:3333/${item.avatar_front}`,
                    avatar_back: `http://localhost:3333/${item.avatar_back}`,
                    date: item.created_at
                }
            })
            return Response.response(list[0], 200, "cadastrado com sucesso")
        } catch (err) {
            return Response.response(err, 500, "error no cadastro")
        }
    }

    async store({ request, params }) {
        const { id } = params
        const { username, email, password, empresa, whatsapp, site,
            linkedin, descricao_empresa, city, uf, interesse } = request.all()
        try {
            const res = await User.create({
                perfil_id: id,
                username: username,
                email: email,
                password: password,
                empresa: empresa,
                whatsapp: whatsapp,
                site: site,
                linkedin: linkedin,
                descricao_empresa: descricao_empresa,
                city: city,
                uf: uf,
                interesse: interesse
            })
            return Response.response(res, 200, "cadastrado com sucesso")
        } catch (err) {
            return Response.response(err, 500, "error no cadastro")
        }
    }

    async login({ request, auth }) {
        //try {
            const { email, password } = request.all()
            const res = await auth.attempt(email, password)
            const token = res.token;
            var user = await Database.select('*')
                .table('users')
                .where('email',email)
           for(var data of user){
                return Response.response({ token,data}, 200, "cadastrado com sucesso")
             }
          
        /* } catch (err) {
            return Response.response(err, 400, "error no login")
        } */
    }

    async update({request,params}) {
        const { user_id,perfil_id } = params
        const { username, email, password, empresa, whatsapp, site,
            linkedin, descricao_empresa, city, uf, interesse } = request.all()

        try {
            const data = await User.find(user_id)
             await data.merge({
                perfil_id: perfil_id,
                username: username,
                email: email,
                password: password,
                empresa: empresa,
                whatsapp: whatsapp,
                site: site,
                linkedin: linkedin,
                descricao_empresa: descricao_empresa,
                city: city,
                uf: uf,
                interesse: interesse
            })

            var res = await data.save()
            return Response.response(res, 200, "cadastrado com sucesso")
        } catch (err) {
            return Response.response(err.message, 500, "error no cadastro")
        }
    }

    async uploadFront({ params, request, response }) {
        const {id} = params
        
        const validationOptions = {
            types: ['image'],
            size: '500mb',
            extnames: ['png', 'jpg', 'svg', 'gif', 'PNG', 'JPG', 'SVG', 'GIF']
        }
          const {old_file}=request.all()
          
        try {
            const data = await User.find(id)
        const avatars = request.file('file', validationOptions)
        var avatar = `front/${new Date().getTime()}.${avatars.extname}`
           var exists = Helpers.promisify(require('fs').exists)

             exists(Helpers.tmpPath(old_file),async(res)=>{
                 if(res==true){ 
                    const fs = Helpers.promisify(require('fs'))
                    await fs.unlink(Helpers.tmpPath(old_file))
                    await avatars.move(Helpers.tmpPath(), {
                         name: avatar,
                         overwrite: true
                    })
                 }else{
                     await avatars.move(Helpers.tmpPath(), {
                     name: avatar,
                     overwrite: true
                  })
               } 
            }) 

         await data.merge({
             avatar_front: avatar
         })
         var res = await data.save()
       
        if (!avatars.moved()) return avatars.error()
        
        return Response.response(res, 200, "cadastrado com sucesso")

        } catch (error) {
            return error
        }
        
   
    }

    async uploadBack({ params, request, response }) {
        const { id } = params
        const {old_file}=request.all()
        const validationOptions = {
            types: ['image'],
            size: '500mb',
            extnames: ['png', 'jpg', 'svg', 'gif', 'PNG', 'JPG', 'SVG', 'GIF']
        }
        try {
            const data = await User.find(id)
            const avatars = request.file('file', validationOptions)
            var avatar = `back/${new Date().getTime()}.${avatars.extname}`

            var exists = Helpers.promisify(require('fs').exists)
            exists(Helpers.tmpPath(old_file),async(res)=>{
                if(res==true){ 
                    const fs = Helpers.promisify(require('fs'))
                    await fs.unlink(Helpers.tmpPath(old_file))
                    await avatars.move(Helpers.tmpPath(), {
                        name: avatar,
                        overwrite: true
                    })
                }else{
                    await avatars.move(Helpers.tmpPath(), {
                        name: avatar,
                        overwrite: true
                    })
                } 
            }) 
            await data.merge({
                avatar_back: avatar
            })
            var res = await data.save()
            if (!avatars.moved()) return avatars.error()
            return Response.response(res, 200, "cadastrado com sucesso")
        
        }catch (error) {
            return Response.response(error, 500, "erro de cadastro")
        }
    }     

}

module.exports = UserController
