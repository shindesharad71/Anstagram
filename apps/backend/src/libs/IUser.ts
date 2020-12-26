import { Request } from 'express';

export interface IUser extends Request {
	user: any;
}
