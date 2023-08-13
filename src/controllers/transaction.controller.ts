import {Request, Response} from 'express';
import {logger} from '@typegoose/typegoose/lib/logSettings';
import {sendTransaction} from '../services/transaction.service';
import {findAllTransactions} from '../repositories/transaction.repository';

export const createTransactionController = async (
  req: Request,
  res: Response
) => {
  try {
    const transaction = await sendTransaction(req.body);
    res.json(transaction);
  } catch (err) {
    logger.error((err as Error).message);
    res.statusCode = 400;
    res.json({message: (err as Error).message});
  }
};

export const getAllTransactionsController = async (
  _: Request,
  res: Response
) => {
  try {
    const transactions = await findAllTransactions();
    res.json(transactions);
  } catch (err) {
    logger.error(err?.toString());
    res.statusCode = 500;
    res.send('Something went wrong!');
  }
};
