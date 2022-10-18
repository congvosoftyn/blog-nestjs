import { SECRET_ACCESS_KEY } from './../../configs';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import * as jwt from 'jsonwebtoken';

@Injectable()
export default class JwtAuthenticationGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>();
        let token = req.headers.authorization ? req.headers.authorization : req.headers.cookie;

        if (!token) throw new HttpException("Authentication token miss!", HttpStatus.UNAUTHORIZED)

        token = token.toString().startsWith('token=') ? token.toString().slice(6, token.length).trimStart() : token.toString().slice(7, token.length).trimStart();

        try {
            const decoded: any = jwt.verify(`${token}`, SECRET_ACCESS_KEY);
            return !!decoded;
        } catch (error) {
            if (error.name == 'TokenExpiredError') {
                throw new HttpException('Expired Tokens', HttpStatus.UNAUTHORIZED);
            }
            throw new UnauthorizedException('Wrong authentication token');
        }
        return false
    }
}