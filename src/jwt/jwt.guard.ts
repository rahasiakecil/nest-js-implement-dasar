import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { NO_JWT_KEY } from 'src/decorators/no-jwt.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private readonly reflector : Reflector
    ) {
        super();
    }

    canActivate(context: ExecutionContext): boolean {
        // const request = context.switchToHttp().getRequest();
        const noJwt = this.reflector.get<boolean>(NO_JWT_KEY, context.getHandler()) || this.reflector.get<boolean>(NO_JWT_KEY, context.getClass());

        if (noJwt) {
            return true; // Lewati pemeriksaan JWT
        }
        const canActivate = super.canActivate(context);
        return canActivate as boolean; // Mengembalikan hasil
    }

    handleRequest(err: any, user: any) {
        if (err || !user) {
            throw new UnauthorizedException('gabisa brody!'); // Pesan kustom
        }
        return user;
    }
}