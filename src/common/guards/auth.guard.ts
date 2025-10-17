import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService, private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const hasBearerToken = request.headers.authorization && request.headers.authorization.startsWith('Bearer ');
    
    if (!hasBearerToken) {
      return false;
    }

    const isValidToken = this.jwtService.verify(request.headers.authorization.split(' ')[1]);
    if (!isValidToken) {
      return false;
    }

    return true;
  }
}
