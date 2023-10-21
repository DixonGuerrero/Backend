import { Request, Response, response } from "express"
import comentario from '../models/comment'

//Control para obtener usuarios

export const getcomentarios = async (req:Request,res:Response) => 
{
    const listcomentario = await comentario.findAll();
    

    res.json(listcomentario)
}

//Control para obtener usuario con id

export const getcomentario = async (req:Request,res:Response) => 
{
    const { id } = req.params;
    const comment = await comentario.findByPk(id);

    if (comment) {
       res.json(comment) 
    } else {
        res.status(404).json({
            msg: 'comentario no encontrado'
        })
    }

    
}
export const getcomentariopl = async (req:Request,res:Response) => 
{
    const { id_Pelicula } = req.params;
    const comment = await comentario.findAll({
        where: {
          id_Pelicula ,
        },
      });

    if (comment) {
       res.json(comment) 
    } else {
        res.status(404).json({
            msg: 'comentario no encontrado'
        })
    }

    
}

//Control para eliminiar usuario con id

export const deletecomentario = async (req: Request, res: Response) => {
    const { id } = req.params;

    const comment = await comentario.findByPk(id);
    if (!comment) {
        res.status(404).json({
            msg: 'comentario no encontrada'
        })
    } else {
        await comment.destroy();
        res.json({
            msg: 'Comentario eliminado con exito'
        })
    }
   
}

//Control para Crear usuario

export const postcomentario = async (req: Request, res: Response) => {
    
    //en el body.json no es necesario poner el id de la nueva persona
    const { body } = req;
    let validation = false;

    if(body['comentario']){
        validation = await validationComment(body['comentario'],res);
        console.log(body['comentario']);
    };
    

        if(validation) {
            console.log(body.comentario);
        try {
        await comentario.create(body);
        res.json({
            msg: 'comentario creado con exito',
            body
        });
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Fallo la creación del comentario'
        });
    }
} 
    }
    
    



//Control actualizar usuario



//funcion para validar comentario 

async function validationComment(comentario: string, res:Response){
   if(!comentario || comentario.length >=255){
    res.json({
        msg:"Alcansaste limite de caracteres"
    })
    return false;
}

   return true

}
