import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ClientService } from './client.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class ClientController {
  constructor(
    private clientService: ClientService,
    private dataSource: DataSource,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('clients')
  async getClients(@Request() req) {
    return this.clientService.findByCompanyId(req.query.companyId);
  }

  @Get('client-by-user')
  async getClientByUser(@Request() req) {
    return this.clientService.findOneByUser(req.query.user);
  }

  @Get('client')
  async getClient(@Request() req) {
    return this.clientService.findOne(req.query.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-client')
  async createClient(@Request() req) {
    return this.clientService.create(
      req.body.companyId,
      req.body.userId,
      req.body.name,
      req.body.address,
      req.body.contact,
      this.dataSource,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-client')
  async updateClient(@Request() req) {
    return this.clientService.update(
      req.body.id,
      req.body.name,
      req.body.address,
      req.body.contact,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove-client')
  async removeClient(@Request() req) {
    return this.clientService.remove(req.body.id);
  }
}
