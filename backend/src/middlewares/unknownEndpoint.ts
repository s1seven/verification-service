import {Request} from 'express';
import {UnknownEndpointError} from '../errors';
import {asyncHandler} from '@restless/restless';

export const unknownEndpoint = asyncHandler((_, req: Request) => {
  throw new UnknownEndpointError(req.method, req.path);
});
