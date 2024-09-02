import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Employee } from './employee.entity';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Company } from 'src/company/company.entity';
import { Office } from 'src/office/office.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { OfficeService } from 'src/office/office.service';
import { CompanyService } from 'src/company/company.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Company, User, Office])],
  providers: [
    EmployeeService,
    JwtService,
    UsersService,
    OfficeService,
    CompanyService,
  ],
  controllers: [EmployeeController],
  exports: [TypeOrmModule, EmployeeService],
})
export class EmployeeModule {}
