import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class CompanyController {
  constructor(
    private companyService: CompanyService,
    private dataSource: DataSource,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('companies')
  async getCompanies() {
    return this.companyService.findAll();
  }

  @Get('company-by-id')
  async getCompanyById(@Request() req) {
    return this.companyService.findOne(req.query.id);
  }

  @Get('company')
  async getCompany(@Request() req) {
    return this.companyService.findOneByName(req.query.name);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-company')
  async createCompany(@Request() req) {
    return this.companyService.create(
      req.body.name,
      req.body.address,
      req.body.contact,
      this.dataSource,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-company')
  async updateCompany(@Request() req) {
    return this.companyService.update(
      req.body.id,
      req.body.name,
      req.body.address,
      req.body.contact,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove-company')
  async removeCompany(@Request() req) {
    return this.companyService.remove(req.body.id);
  }
}
