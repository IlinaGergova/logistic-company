import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EmployeeService } from './employee.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class EmployeeController {
  constructor(
    private employeeService: EmployeeService,
    private dataSource: DataSource,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('employees')
  async getEmployees(@Request() req) {
    return this.employeeService.findByCompanyId(req.query.companyId);
  }

  @Get('employees-by-position')
  async getEmployeesByPosition(@Request() req) {
    return this.employeeService.findByPosition(req.query.position);
  }

  @Get('employees-by-office')
  async getEmployeesByParent(@Request() req) {
    return this.employeeService.findByOffice(req.query.officeId);
  }

  @Get('employee-by-user')
  async getEmployeeByUser(@Request() req) {
    return this.employeeService.findOneByUser(req.query.user);
  }

  @Get('employee')
  async getEmployee(@Request() req) {
    return this.employeeService.findOne(req.query.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-employee')
  async createEmployee(@Request() req) {
    return this.employeeService.create(
      req.body.companyId,
      req.body.userId,
      req.body.name,
      req.body.address,
      req.body.contact,
      req.body.position,
      req.body.officeId,
      this.dataSource,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-employee')
  async updateEmployee(@Request() req) {
    return this.employeeService.update(
      req.body.id,
      req.body.name,
      req.body.address,
      req.body.contact,
      req.body.officeId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove-employee')
  async removeEmployee(@Request() req) {
    return this.employeeService.remove(req.body.id);
  }
}
