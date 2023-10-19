import { Request, Response } from "express";
import Person from "../models/person";
import jwt from "jsonwebtoken"

//Control para obtener usuarios

export const getPersons = async (req: Request, res: Response) => {
  const listPersons = await Person.findAll();

  res.json(listPersons);
};

//Control para obtener usuario con id

export const getPerson = async (req: Request, res: Response) => {
  const { id } = req.params;
  const person = await Person.findByPk(id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).json({
      msg: "Persona no encontrada",
    });
  }
};

//Crontol para obtener el usuario por nombre_Usuario

export const getPersonByName = async (req: Request, res: Response) => {
  const { nombre_Usuario } = req.params;

  const person = await Person.findOne({
    where: {
      nombre_Usuario: nombre_Usuario,
    },
  });

  if (person) {
    res.json(person);
  } else {
    res.status(404).json({
      msg: "Persona no encontrada",
    });
  }
};
//Control para eliminiar usuario con id

export const deletePerson = async (req: Request, res: Response) => {
  const { id } = req.params;

  const person = await Person.findByPk(id);
  if (!person) {
    res.status(404).json({
      msg: "Persona no encontrada",
    });
  } else {
    await person.destroy();
    res.json({
      msg: "Persona eliminada con exito",
    });
  }
};

//Control para Crear usuario

export const postPerson = async (req: Request, res: Response) => {
  const { body } = req;

  var nombreValidation = false;
  var passwordValidation = false;

  const correoValidation = await validateCorreo(
    body["correo_Electronico"],
    res
  );

  if (correoValidation) {
    nombreValidation = await validateNombreUsuario(body["nombre_Usuario"], res);
  }

  if (nombreValidation) {
    passwordValidation = await validateContrasenia(body["contrasenia"], res);
  }

  if (correoValidation && nombreValidation && passwordValidation) {
    try {
      await Person.create(body);
      res.json({
        msg: "Persona Creada con éxito",
        body,
      });
    } catch (error) {
      console.log(error);
      res.json({
        msg: "Fallo la creación de la persona",
      });
    }
  }
};
//Control actualizar usuario

export const updatePerson = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  var correoValidation = false;
  var nombreValidation = false;
  var passwordValidation = false;

  if (body.correo_Electronico) {
    correoValidation = await validateCorreo(body["correo_Electronico"], res);
  } else {
    correoValidation = true;
  }

  if (body.nombre_Usuario) {
    if (correoValidation) {
      nombreValidation = await validateNombreUsuario(
        body["nombre_Usuario"],
        res
      );
    }
  } else {
    nombreValidation = true;
  }

  if (body.contrasenia) {
    if (nombreValidation) {
      passwordValidation = await validateContrasenia(body["contrasenia"], res);
    }
  } else {
    passwordValidation = true;
  }

  if (nombreValidation && correoValidation && passwordValidation) {
    try {
      const person = await Person.findByPk(id);
      if (person) {
        await person.update(body);
        res.json({
          msg: "La persona fue actualizada con exito",
          id,
          body,
        });

    
      } else {
        res.status(404).json({
          msg: "La Persona no existe",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({
        msg: "Fallo la actualizacion de la persona",
      });
    }
  }
};

//Funciones para facilitar validaciones

async function validateCorreo(correo: string, res: Response) {
  if (!correo || !correo.includes("@") || !/@[a-zA-Z]+/.test(correo)) {
    res
      .status(400)
      .json({ msg: `${correo} <- Esto no es una dirección de correo válida` });
    return false;
  }

  const personSearchEmail = await Person.findOne({
    where: { correo_Electronico: correo },
  });
  if (personSearchEmail) {
    res
      .status(400)
      .json({ msg: `${correo} <- Esta dirección de correo ya existe` });
    return false;
  }

  return true;
}

async function validateNombreUsuario(nombreUsuario: string, res: Response) {
  if (!nombreUsuario || nombreUsuario.length <= 5) {
    res.status(400).json({
      msg: `${nombreUsuario} <- El nombre de usuario requiere al menos 5 caracteres`,
    });
    return false;
  }

  const personSearchNameUser = await Person.findOne({
    where: { nombre_Usuario: nombreUsuario },
  });
  if (personSearchNameUser) {
    res
      .status(400)
      .json({ msg: `${nombreUsuario} <- Este nombre de usuario ya existe` });
    return false;
  }

  return true;
}

async function validateContrasenia(contrasenia: string, res: Response) {
  if (
    !contrasenia ||
    contrasenia.length < 8 ||
    !/[\W_]/.test(contrasenia) ||
    contrasenia.length >= 15
  ) {
    res.status(400).json({
      msg: `${contrasenia} <- Esta contraseña no cumple con el estándar`,
    });
    return false;
  }

  const personSearchPassword = await Person.findOne({ where: { contrasenia } });
  if (personSearchPassword) {
    res
      .status(400)
      .json({ msg: `${contrasenia} <- Esta contraseña no es válida` });
    return false;
  }

  return true;
}


export const loginPerson = async(req:Request, res:Response)=>{

    const{nombre_Usuario,contrasenia}= req.body//aqui se manda solo el username y password ingresados en base de datos

    //se valida que el usuario exista
    const user= await Person.findOne({
        where:{
        nombre_Usuario: nombre_Usuario,
        contrasenia: contrasenia
        }
    })
    if(!user){
        return res.status(400).json({

            msg:'El nombre de usuario o contraseña son erroneos '
        })
    }//if

    //validamos la contraseña
        

    //creacion del token para permitir entrada
    const token=jwt.sign({
      user


    },process.env.SECRET_KEY|| 'pepito123');
  const userValidation = jwt.decode(token);

  if (
    userValidation !== null &&
    typeof userValidation === "object" &&
    "user" in userValidation
  ) {
    const user = userValidation.user;
    res.json(user);
  } else {
    // Trata el caso en el que userValidation es null o no contiene la propiedad 'user'
    res.status(404).json({ error: "No se encontró un usuario válido" });
  }
}//loginPerson