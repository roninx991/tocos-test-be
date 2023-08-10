import express, { Express, Request, Response } from 'express';
import { initLogger } from './configurations/LoggerConfig';
import connect from './configurations/MongoDBConnection';
import { createUser } from './services/UserService';
import { findAllTransactions, findAllUsers, findUserByIdOrUsername } from './repositories/UserRepository';
import { sendTransaction } from './services/TransactionService';
import { HOSTNAME, MONGODB_URI, PORT } from './utils/AppConstants';
import cors from 'cors';

const main = async () => {
    const app: Express = express();
    app.use(express.json());
    app.use(cors());
    
    let logger = initLogger(HOSTNAME);
    
    await connect(MONGODB_URI);
    
    app.post('/user/', async (req: Request, res: Response) => {
        try {
            let newUser = await createUser(req.body.username);
            res.json(newUser); 
        } catch (err) {
            logger.error((err as Error).message);
            res.statusCode = 400;
            res.json({message: (err as Error).message});
        }
    });
    
    app.get('/user/:id/', async (req: Request, res: Response) => {

        let user = await findUserByIdOrUsername(req.params.id);
        if (user == undefined || user == null) {
            res.statusCode = 404;
            res.json({message: `User with username or id ${req.params.id} does not exist`});
        } else {
            res.json(user);
        }
    });

    app.get('/user/', async (req: Request, res: Response) => {
        let users = await findAllUsers();
        res.json(users);
    });
    
    app.post('/transactions/', async (req: Request, res: Response) => {
        try {
            let transaction = await sendTransaction(req.body);
            res.json(transaction);                
        } catch (err) {
            logger.error((err as Error).message);
            res.statusCode = 400;
            res.json({message: (err as Error).message});
        }
    });

    app.get('/transactions/', async (req: Request, res: Response) => {
        let transactions = await findAllTransactions();
        res.json(transactions);
    });
    
    app.listen(PORT, () => {
      logger.info(`Server is running at http://localhost:${PORT}`);
    });    
}

main();

