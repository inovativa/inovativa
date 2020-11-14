'use strict'
const User=use('App/Models/User')
const UserStar=use('App/Models/UserStar')
const Database=use('Database')
const Response = use('App/Models/Response')

class UserStarController {
    async index(){
        const stars=UserStar.all()
        return stars
     }
 
     async indexOne({params}){
        const {id}=params
        const res = await Database.select('*')
        .table('user_stars')
        .where('user_stars.id','>',0)
        .where('user_stars.user_id',id)
        const list = res.map(user => {
         return {
            user_id:user.user_id,
            empresa: user.empresa,
            username:user.username,
            whatsapp:user.whatsapp,
            site:user.site,
            linkedin:user.linkedin,
            city:user.city,
            interesse:user.interesse,
            uf:user.uf,
             avatar: `http://localhost:3333/${user.avatar}`,
             date: user.created_at
           }
     })
        return Response.response(list, 200, "cadastrado com sucesso")
    }
    async create({params}){
        const {user_id}=params
        const user=await Database.select('*')
                .table('perfils')
                .leftJoin("users", "perfils.id", "users.perfil_id")
                .where("users.id", user_id)
                //return user
        const verifyStar=await UserStar.query()
                     .where('user_id',user_id)
                     .getCount();       
        if(verifyStar==0){
           const res=user.map(user=>{
                  return UserStar.create({
                                user_id:user_id,
                                empresa: user.nome_perfil,
                                username:user.username,
                                whatsapp:user.whatsapp,
                                site:user.site,
                                linkedin:user.linkedin,
                                city:user.city,
                                interesse:user.interesse,
                                uf:user.uf,
                                avatar: user.avatar_front,
                        })
                    })
           
        return Response.response(res, 200, "histórico guardado com sucesso")
        }
          await UserStar.query().where('user_id',user_id).delete()  
        return Response.response(null, 200, "histórico deletado com sucesso")
    }
}

module.exports = UserStarController
