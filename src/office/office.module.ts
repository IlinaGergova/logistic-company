import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeService } from './office.service';
import { JwtService } from '@nestjs/jwt';
import { Office } from './office.entity';
import { OfficeController } from './office.controller';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Office, Company])],
  providers: [OfficeService, JwtService, CompanyService],
  controllers: [OfficeController],
  exports: [TypeOrmModule, OfficeService],
})
export class OfficeModule {}
