/** Required External Modules */
import { LogLevel } from "bunyan";
import bunyan from 'bunyan';

let loggerInstance: bunyan;

export const initLogger = (hostname: string = "", level: LogLevel = bunyan.INFO) => {
    if (loggerInstance == null || loggerInstance == undefined) {
        loggerInstance = bunyan.createLogger({
            name: "tocos-be",
            hostname,
            streams: [
            {
                level,
                stream: process.stdout,
            },
            ],
        });    
    }
    return loggerInstance;
}
  

export default initLogger();
