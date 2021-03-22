import express from 'express';

export function sendError(res: express.Response, [errorCode, message]: [number, string]): void {
  res.status(errorCode).json({
    status: 'Bad request',
    message: message
  });
}
