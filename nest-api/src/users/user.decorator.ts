import { BadRequestException, createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { SECRET_ACCESS_KEY } from 'src/configs';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  // if route is protected, there is a user set in auth.middleware
  if (!!req.user) {
    return !!data ? req.user[data] : req.user;
  }

  // in case a route is not protected, we still want to get the optional auth user from jwt
  // const token = req.headers.authorization ? (req.headers.authorization as string).split(' ') : null;
  let token = req.headers.authorization ? req.headers.authorization : req.headers.cookie;
  token = token.toString().startsWith('token=') ? token.toString().slice(6, token.length).trimStart() : token.toString().slice(7, token.length).trimStart();

  if (token) {
    try {
      const decoded: any = jwt.verify(token, SECRET_ACCESS_KEY);
      return !!data ? decoded[data] : decoded.user;
    } catch (error) {
      if (error.name == 'TokenExpiredError') {
        throw new HttpException('Expired Tokens', HttpStatus.UNAUTHORIZED);
      }
      throw new BadRequestException()
    }
  }
});
