'use strict'
const Star=use('App/Models/Star')
const Artigo = use('App/Models/Artigo')
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
       .where('stars.artigo_id',id)
       const list = res.map(item => {
        return {
            id:item.id,
            artigo_id:item.artigo_id,
            address: item.subtitle,
            title: item.title,
            description: item.description,
            avatar: `http://localhost:3333/${item.avatar}`,
            date: item.created_at
          }
    })
       return Response.response(list, 200, "cadastrado com sucesso")
   }
   async create({params}){
       const {artigo_id,user_id}=params
       const artigo=await Artigo.find(artigo_id)
       const verifyStar=await Star.query()
                    .where('artigo_id',artigo_id)
                    .getCount();     
       if(verifyStar==0){
           const res = await Star.create({
               user_id:user_id,
               evento_id: 1,
               artigo_id: artigo.id,
               address: artigo.subtitle,
               title: artigo.title,
               description: artigo.description,
               avatar: `http://localhost:3333/${artigo.avatar}`,
            })
       return Response.response(res, 200, "histórico guardado com sucesso")
       }
         await Star.query().where('artigo_id',artigo_id).delete()  
       return Response.response(null, 200, "histórico deletado com sucesso")
   }
}

module.exports = StarController
