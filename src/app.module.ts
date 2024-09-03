import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { ClientModule } from './client/client.module';
import { CompanyModule } from './company/company.module';
import { Employee } from './employee/employee.entity';
import { EmployeeModule } from './employee/employee.module';
import { OfficeModule } from './office/office.module';
import { OrderModule } from './order/order.module';
import { Client } from './client/client.entity';
import { Company } from './company/company.entity';
import { Order } from './order/order.entity';
import { Office } from './office/office.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      // port: 8081,
      username: 'root',
      password: 'root',
      database: 'logistic_company',
      logging: 'all',
      entities: [User, Client, Company, Employee, Office, Order],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    ClientModule,
    CompanyModule,
    EmployeeModule,
    OfficeModule,
    OrderModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
