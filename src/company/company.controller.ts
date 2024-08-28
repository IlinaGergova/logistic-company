import { Controller } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CompanyService } from './company.service';

@Controller()
export class CompanyController {
  constructor(
    private companyService: CompanyService,
    private dataSource: DataSource,
  ) {}
}
