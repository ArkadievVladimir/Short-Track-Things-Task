import express from 'express';
import * as things from '../services/thing';
import { sendError } from '../utils/sendMessage';
import { responseGetProps } from '../services/thing';

class Api {
  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { page, skip, limit = 10 } = req.query;
      let response: responseGetProps;

      if (page) {
        response = await things.pagination(+page, +limit);
      } else if (skip) {
        response = await things.infiniteScroll(+skip, +limit);
      } else {
        response = await things.getAll();
      }

      res.json(response);
    } catch (error) {
      sendError(res, [500, error]);
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const newThing = await things.create(req.body);
      res.json({ 
        status: 'New thing successfully added',
        _id: newThing._id,
        createdAt: newThing.createdAt
      });
    } catch (error) {
      sendError(res, [500, error]);
    }
  }

  async update(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { id } = req.params;
      things.update(id, req.body)
        .then(() => { res.json({ status: 'Thing successfully update' })})
        .catch((error) => sendError(res, [400, error]));
    } catch (error) {
      sendError(res, [500, error]);
    }
  }

  async delete(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { id } = req.params;
      things.deleteById(id)
        .then(() => { res.json({ status: 'Thing successfully delete' })})
        .catch((error) => sendError(res, [400, error]));
    } catch (error) {
      sendError(res, [500, error]);
    }
  }
}

export const ThingsApi = new Api();
