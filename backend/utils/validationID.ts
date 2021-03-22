import express from 'express';
import { sendError } from '../utils/sendMessage';
import { isIDExist } from '../services/thing';

export async function validationID (req: express.Request, res: express.Response, next: Function) {
  const { id } = req.params;
  
  if (await isIDExist(id).catch(() => false)) {
    next();
  } else {
    return sendError(res, [400, 'ID does not exist']);
  }
}
