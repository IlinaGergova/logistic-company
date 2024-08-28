import { Controller } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PackageService } from './package.service';

@Controller()
export class PackageController {
  constructor(
    private packageService: PackageService,
    private dataSource: DataSource,
  ) {}
}
