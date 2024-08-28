import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(
    ...args: Parameters<
      InstanceType<ReturnType<typeof AuthGuard>>['handleRequest']
    >
  ) {
    return super.handleRequest(...args);
  }
}
