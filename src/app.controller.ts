import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { User } from './users/user.entity';

interface UserData {
  user: User;
  token: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const userToken = this.authService.login(req.user);
    const user: UserData = {
      user: req.user,
      token: (await userToken).access_token,
    };
    return user;
  }
}
