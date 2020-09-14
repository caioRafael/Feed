import { Request, Response } from "express";
import db from "../database/connection";

export default class PostController{

    async index(request: Request, response:Response){
        const post = await db('posts').select('*');

        return response.json(post);
    }

    async create(request:Request, response:Response){
        const {subtitle} = request.body
        const url_image = `http://localhost:3333/newPosts/${request.file.filename}`
        
        try {
            const newPost = await db('posts').insert({
                url_image,
                subtitle
            })
    
    
            return response.json(newPost)
        } catch (err) {
            console.log(err);
            await (await db.transaction()).rollback();

            return response.status(400).json({
                error: 'Unexpected error while creating new post'
            })
        }
        
    }

    async update(request:Request, response:Response){
        const {id} = request.params;
        const {
            subtitle,
            url_image
        } = request.body;
        
        await db('posts').where('id', id).update({
            url_image,
            subtitle
        })

        return response.json({
            post:id,
            subtitle:subtitle,
            url_image:url_image});
    }

    async delete(request:Request, response:Response){
        const {id} = request.params;

        await db('posts').where('id',id).delete();

        return response.json({mensage:"post deletado"});
    }
}