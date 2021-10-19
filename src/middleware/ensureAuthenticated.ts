import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface PayloadProps {
	sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
	const authToken = req.headers.authorization;

	if (!authToken){
		return res.status(401).json({
			errorCode: 'token.invalid'
		})
	}

	const [, token ] = authToken.split(" ");

	try {
		const { sub } = verify(token, process.env.JWT_SECRET as string) as PayloadProps;

		req.user_id = sub;

		return next();
	} catch (e) {
		return res.status(401).json({ errorCode: "token expired"});
	}
}