
import { Request, Response } from "express"
import view from '../models/view'

//Control para obtener favoritos

export const getFavs = async (req:Request,res:Response) => 
{   
    const listFavs = await view.findAll();
    console.log(listFavs);

    res.json(listFavs)
}

//Control para obtener historial

export const getHistory = async (req:Request,res:Response) => 
{
    const listhistory = await view.findAll();
    console.log(listhistory);

    res.json(listhistory)
}



//Control para eliminiar Favorito con id

export const deleteFav = async (req: Request, res: Response) => {
    const { id } = req.params;

    const fav = await view.findByPk(id);
    if (!fav) {
        res.status(404).json({
            msg: 'Favorito no encontrado'
        })
    } else {
        await fav.destroy();
        res.json({
            msg: 'Favorito eliminado con exito'
        })
    }
   
}

//Control para Crear favorito

export const postfav = async (req: Request, res: Response) => {
    
    //en el body.json no es necesario poner el id de la nueva persona
    const { body } = req;
    try {
    await view.create(body);
    res.json({
        msg: 'favorito Creada con exito',
        body
    })
    } catch (error) {
        console.log(error);
        res.json({
            msg:'Fallo la creacion de favorito'
        })
    
    }
    
}

