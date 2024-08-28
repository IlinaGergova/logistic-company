import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class UsersController {
  constructor(
    private usersService: UsersService,
    private dataSource: DataSource,
  ) {}

  // @Get('userId')
  // async getUserId(@Request() req) {
  //   return this.usersService.findOne(req.query.username);
  // }

  @UseGuards(JwtAuthGuard)
  @Post('create-user')
  async createUser(@Request() req) {
    return this.usersService.create(
      req.body.role,
      req.body.username,
      req.body.password,
      this.dataSource,
    );
  }
}
