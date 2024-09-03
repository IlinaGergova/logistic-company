import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { JwtService } from '@nestjs/jwt';
import { Order } from './order.entity';
import { OrderController } from './order.controller';
import { Company } from 'src/company/company.entity';
import { Employee } from 'src/employee/employee.entity';
import { Client } from 'src/client/client.entity';
import { Office } from 'src/office/office.entity';
import { CompanyService } from 'src/company/company.service';
import { OfficeService } from 'src/office/office.service';
import { EmployeeService } from 'src/employee/employee.service';
import { ClientService } from 'src/client/client.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Company, Office, Employee, Client, User]),
  ],
  providers: [
    OrderService,
    JwtService,
    CompanyService,
    OfficeService,
    EmployeeService,
    ClientService,
    UsersService,
  ],
  controllers: [OrderController],
  exports: [TypeOrmModule, OrderService],
})
export class OrderModule {}
