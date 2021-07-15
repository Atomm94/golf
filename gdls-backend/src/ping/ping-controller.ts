import {Application, Request, Response} from "express";
import asyncWrapper from 'express-async-wrapper';

export async function ping(req: Request, res: Response) {
  res.json({ status: 'OK' });
}

export default (app: Application) => {
  app.get('/ping', asyncWrapper(ping));
}
