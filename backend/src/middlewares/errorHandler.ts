import {Request, Response, NextFunction} from 'express';
import {SanitizeError} from '@restless/restless';
import {AuthenticationError, NotFoundError, UnknownEndpointError} from '../errors';

interface Logger {
  log: (str: string | undefined) => void;
}

export const errorHandler = (logger: Logger) => (err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof SanitizeError) {
    response.status(400).json({reason: err.errors});
  } else if (err instanceof AuthenticationError) {
    response.status(401).json({reason: err.message});
  } else if (err.name === 'MulterError') {
    response.status(400).json({...err, reason: err.message});
  } else if (err instanceof UnknownEndpointError || err instanceof NotFoundError) {
    response.status(404).json({reason: err.message});
  } else {
    logger.log(err.stack);
    response.status(500).json({reason: `Unexpected server error: ${err.message}`});
  }

  next();
};
