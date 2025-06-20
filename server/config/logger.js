import pino from 'pino';
import pkg from 'pino-multi-stream';
const { multistream } = pkg;
import fs from 'fs';
import path from 'path';

const logDir = './logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const streams = [
  { stream: pino.destination(path.join(logDir, 'app.log')) },
  { stream: process.stdout },
];

const logger = pino(
  {
    level: 'info',
  },
  multistream(streams)
);

export default logger;
