import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const roles = this.reflector.get(Roles, context.getHandler());
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

    if (isPublic) {
      return true;
    }

    if (!roles) {
      return false;
    }
    const request = context.switchToHttp().getRequest();

    const hasBearerToken = request.headers.authorization && request.headers.authorization.startsWith('Bearer ');

    if (!hasBearerToken) {
      return false;
    }

    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = this.jwtService.decode(token) as { role: string };
    if (!decodedToken || !decodedToken.role) {
      return false;
    }


    if (roles && !roles.includes(decodedToken.role)) {
      return false;
    }

    return true;
  }
}
