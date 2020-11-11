'use strict'
const User = use('App/Models/User')
const Profil = use('App/Models/Perfil')
const Response = use('App/Models/Response')
const Helpers = use('Helpers')
const Database = use("Database");
class UserController {

    async index() {
        try {
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
        } catch (err) {
            return Response.response(err, 500, "error no cadastro")
        }
    }

    async showOne({ params }) {
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
            return Response.response(list, 200, "cadastrado com sucesso")
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
        try {
            const { email, password } = request.all()
            const res = await auth.attempt(email, password)
            return Response.response(res, 200, "cadastrado com sucesso")
        } catch (err) {
            return Response.response(err, 500, "error no cadastro")
        }
    }

    async update({request,params}) {
        const { id,pf } = params
        const { username, email, password, empresa, whatsapp, site,
            linkedin, descricao_empresa, city, uf, interesse } = request.all()
            
        try {
            const data = await User.find(id)
             await data.merge({
                perfil_id: pf,
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
            return Response.response(err, 500, "error no cadastro")
        }
    }

    async uploadFront({ params, request, response }) {
        const { id } = params
        const validationOptions = {
            types: ['image'],
            size: '500mb',
            extnames: ['png', 'jpg', 'svg', 'gif', 'PNG', 'JPG', 'SVG', 'GIF']
        }
        const data = await User.find(id)
        const avatars = request.file('file', validationOptions)
        var avatar = `front/${new Date().getTime()}.${avatars.extname}`

        await data.merge({
            avatar_front: avatar
        })
        var res = await data.save()

        await avatars.move(Helpers.tmpPath(), {
            name: avatar,
            overwrite: true
        })

        if (!avatars.moved()) return avatars.error()
        return Response.response(res, 200, "cadastrado com sucesso")
   
    }

    async uploadBack({ params, request, response }) {
        const { id } = params
        const validationOptions = {
            types: ['image'],
            size: '500mb',
            extnames: ['png', 'jpg', 'svg', 'gif', 'PNG', 'JPG', 'SVG', 'GIF']
        }
        const data = await User.find(id)
        const avatars = request.file('file', validationOptions)
        var avatar = `back/${new Date().getTime()}.${avatars.extname}`

        await data.merge({
            avatar_back: avatar
        })
        var res = await data.save()

        await avatars.move(Helpers.tmpPath(), {
            name: avatar,
            overwrite: true
        })

        if (!avatars.moved()) return avatars.error()
        return Response.response(res, 200, "cadastrado com sucesso")
    }

}

module.exports = UserController
