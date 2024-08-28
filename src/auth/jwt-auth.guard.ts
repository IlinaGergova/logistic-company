import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(public jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });

    request['user'] = payload;
    // try {
    //   const payload = await this.jwtService.verifyAsync(token, {
    //     secret: jwtConstants.secret,
    //   });

    //   request['user'] = payload;
    // } catch {
    //   console.log("AAAAAAAAAAAAAAAAAAA")
    //   throw new UnauthorizedException();
    // }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// .eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzIwNjI1MjY0LCJleHAiOjE3NTIxNjEyNjR9
// .xRCHUGSOjwYvcQIeBKtYa2ldnCGnFXjXHBPsxT3C-6s
