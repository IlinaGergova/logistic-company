import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Employee } from './employee.entity';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeeService, JwtService],
  controllers: [EmployeeController],
  exports: [TypeOrmModule, EmployeeService],
})
export class EmployeeModule {}
