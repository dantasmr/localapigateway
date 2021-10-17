const winston = require('winston');

const MESSAGE = Symbol.for('message');
const jsonFormatter = (logEntry) => {
    const base = { timestamp: new Date() };
    const json = Object.assign(base, logEntry)
    logEntry[MESSAGE] = JSON.stringify(json);
    return logEntry;
  }
 
const logger = winston.createLogger({
    format: winston.format(jsonFormatter)(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'info.log', level: 'info' }),
    ],
});
 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
 
module.exports = logger;