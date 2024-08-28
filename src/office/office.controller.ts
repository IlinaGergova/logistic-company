import { Controller } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OfficeService } from './office.service';

@Controller()
export class OfficeController {
  constructor(
    private officeService: OfficeService,
    private dataSource: DataSource,
  ) {}
}
