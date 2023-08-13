import * as mongoose from 'mongoose';
import logger from './logger.configuration';
import {MONGODB_URI} from '../utils/constants';

let mongoClient: mongoose.Mongoose | null;

const connect = async (
  mongoUri: string | undefined = MONGODB_URI
): Promise<mongoose.Mongoose | null> => {
  try {
    if (
      (mongoClient === null || mongoClient === undefined) &&
      mongoUri !== undefined
    ) {
      logger.info('Connecting to Mongo Cluster...');
      mongoClient = await mongoose.connect(mongoUri);
      logger.info('Connected to Mongo Cluster successfully');
    }
    return mongoClient;
  } catch (e) {
    logger.error(
      'Error caught during establishing connection with MongoDB: ',
      e
    );
    throw e;
  }
};

export const reset_db_client = () => {
  mongoClient = null;
};

export default connect;
