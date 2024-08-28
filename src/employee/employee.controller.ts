import { Controller } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EmployeeService } from './employee.service';

@Controller()
export class EmployeeController {
  constructor(
    private employeeService: EmployeeService,
    private dataSource: DataSource,
  ) {}
}
