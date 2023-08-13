import express from 'express';
import {
  createTransactionController,
  getAllTransactionsController,
} from '../controllers/transaction.controller';

const transactionRouter = express.Router();

transactionRouter.post('/', createTransactionController);

transactionRouter.get('/', getAllTransactionsController);

export default transactionRouter;
