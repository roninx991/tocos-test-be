import express, { Express } from 'express';
import { initLogger } from './configurations/logger.configuration';
import connect from './configurations/mongodb.connection';
import { PORT } from './utils/constants';
import cors from 'cors';
import userRouter from './routes/user.route';
import transactionRouter from './routes/transaction.route';

const database = async () => {
    await connect();
}

const app: Express = express();
app.use(express.json());
app.use(cors());

    
app.use("/api/users", userRouter);
app.use("/api/transactions", transactionRouter);

database();
let logger = initLogger();    

app.listen(PORT, () => {
    logger.info(`Server is running at http://localhost:${PORT}`);
});    

export default app;
