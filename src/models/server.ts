import express, {Application, Request , Response} from 'express';
import routesPersons from '../routes/persons'
import db from '../db/connetion'
import cors from 'cors'
class Server {
    private app: Application
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares(); 
        this.routes();
        this.dbConnect()
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port)
            })
    }

    routes() {
        this.app.get('/', (req:Request, res:Response) => {
            res.json({
                msg: 'API WORKING'
            })
        })

        //Definimos ruta base de la api
        this.app.use('/api/personas', routesPersons)
        
    
    }

    middlewares() {
    
        //parseamos el body
        this.app.use(express.json());

        //Cors
        this.app.use(cors());
    }

    //Metodo para conectar base de datos

    async dbConnect() {

        //probamos la conexion a la base de datos

        try {
            await db.authenticate();
            console.log('Conexion exitosa');
        } catch (error) {
            console.log(error);
            console.log ('Conexion fallida')
        }
        
    }
}

export default Server;