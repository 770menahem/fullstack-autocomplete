import { Request, Response } from 'express';

export interface ICityController {
    searchCity(req: Request, res: Response): Promise<void>;
}
