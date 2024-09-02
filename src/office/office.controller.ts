import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OfficeService } from './office.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class OfficeController {
  constructor(
    private officeService: OfficeService,
    private dataSource: DataSource,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('offices')
  async getOffices(@Request() req) {
    return this.officeService.findByCompanyId(req.query.company);
  }

  @Get('office')
  async getOffice(@Request() req) {
    return this.officeService.findOne(req.query.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-office')
  async createOffice(@Request() req) {
    return this.officeService.create(
      req.body.companyId,
      req.body.name,
      req.body.address,
      req.body.contact,
      req.body.info,
      this.dataSource,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-office')
  async updateOffice(@Request() req) {
    return this.officeService.update(
      req.body.id,
      req.body.name,
      req.body.address,
      req.body.contact,
      req.body.info,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove-office')
  async removeoffice(@Request() req) {
    return this.officeService.remove(req.body.id);
  }
}
