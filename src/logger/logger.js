import winston from "winston";
import config from "../config/config.js";
import { __dirname } from "../utils.js";

const ENVIRONMENT = config.node_env;
const logsPath = `${__dirname}/logger/logs`;

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "magenta",
    error: "red",
    warning: "yellow",
    info: "green",
    http: "cyan",
    debug: "blue",
  },
};

let logger;

if (ENVIRONMENT === "production") {
  logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
      new winston.transports.Console({
        level: "info",
        format: winston.format.combine(
          winston.format.colorize({
            all: true,
            colors: customLevelOptions.colors,
          }),
          winston.format.simple()
        ),
      }),
      new winston.transports.File({
        filename: `${logsPath}/errors.log`,
        level: "error",
      }),
    ],
  });
} else {
  logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
      new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
          winston.format.colorize({
            all: true,
            colors: customLevelOptions.colors,
          }),
          winston.format.simple()
        ),
      }),
    ],
  });
}

export default logger;
