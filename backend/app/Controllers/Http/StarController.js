'use strict'
const Star=use('App/Models/Star')
const Evento = use('App/Models/Evento')
const Response = use('App/Models/Response')
const Database = use("Database");
class StarController {
    async index(){
       const stars=Star.all()
       return stars
    }

    async indexOne({params}){
       const {id}=params
       //const star=await Star.find(id)
       const res = await Database.select('*')
       .table('users')   
       .leftJoin("stars", "users.id","stars.user_id")
       .where('stars.id','>',0)
       .where('stars.user_id',id)
       const list = res.map(item => {
        return {
            id:item.id,
            evento_id:item.evento_id,
            address: item.address,
            title: item.title,
            description: item.description,
            avatar: `http://localhost:3333/${item.avatar}`,
            date: item.created_at
          }
    })
       return Response.response(list, 200, "cadastrado com sucesso")
   }
   async create({params}){
       const {evento_id,user_id}=params
       const evento=await Evento.find(evento_id)
       const verifyStar=await Star.query()
                    .where('evento_id',evento_id)
                    .getCount();       
       if(verifyStar==0){
           const res = await Star.create({
               user_id:user_id,
               evento_id: evento.id,
               address: evento.address,
               title: evento.title,
               description: evento.description,
               avatar: `http://localhost:3333/${evento.avatar}`,
            })
       return Response.response(res, 200, "histórico guardado com sucesso")
       }
         await Star.query().where('evento_id',evento_id).delete()  
       return Response.response(null, 200, "histórico deletado com sucesso")
   }
}

module.exports = StarController
