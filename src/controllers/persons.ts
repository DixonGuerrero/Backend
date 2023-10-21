
import { Request, Response } from "express"
import Person from '../models/person'

//Control para obtener usuarios

export const getPersons = async (req:Request,res:Response) => 
{
    const listPersons = await Person.findAll();
    console.log(listPersons);

    res.json(listPersons)
}

//Control para obtener usuario con id

export const getPerson = async (req:Request,res:Response) => 
{

    const { id } = req.params;
    const person = await Person.findByPk(id);

    
    
    

    if (person) {
        
       res.json(person) 
    } else {
        res.status(404).json({
            msg: 'Persona no encontrada'
        })
    }

    
}

//Control para eliminiar usuario con id

export const deletePerson = async (req: Request, res: Response) => {
    const { id } = req.params;

    const person = await Person.findByPk(id);
    if (!person) {
        res.status(404).json({
            msg: 'Persona no encontrada'
        })
    } else {
        await person.destroy();
        res.json({
            msg: 'Persona eliminada con exito'
        })
    }
   
}

//Control para Crear usuario

export const postPerson = async (req: Request, res: Response) => {
    
    //en el body.json no es necesario poner el id de la nueva persona
    const { body } = req;
    try {
    await Person.create(body);
    res.json({
        msg: 'Persona Creada con exito',
        body
    })
    } catch (error) {
        console.log(error);
        res.json({
            msg:'Fallo la creacion de la persona'
        })
    
    }
    
}

//Control actualizar usuario

export const updatePerson = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        const person = await Person.findByPk(id);
    if (person) {
        await person.update(body);
        res.json({
            msg: 'La persona fue actualizada con exito',
            id,
            body
        })
    } else {
        res.status(404).json({
            msg: 'La Persona no existe'
        })
    }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg:'Fallo la actualizacion de la persona'
        })
        
    }
    
}
