import { Request, Response } from 'express';

export interface Context {
  req: Request;
  res: Response;
  payload?: { user_id: string };
}
