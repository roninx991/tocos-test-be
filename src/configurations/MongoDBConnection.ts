import * as mongoose from 'mongoose';
import logger from './LoggerConfig';

let mongoClient: mongoose.Mongoose;

const connect = async (mongoUri: string): Promise<mongoose.Mongoose> => {
    try {
        if (mongoClient == null || mongoClient == undefined) {
            logger.info("Connecting to Mongo Cluster...");
            mongoClient = await mongoose.connect(mongoUri)
            logger.info("Connected to Mongo Cluster successfully");
        }
        return mongoClient;
    } catch (e) {
        logger.error("Error caught during establishing connection with MongoDB: ", e);
        process.exit();
    }
}

export default connect;