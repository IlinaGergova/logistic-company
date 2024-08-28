import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from './company.service';
import { JwtService } from '@nestjs/jwt';
import { Company } from './company.entity';
import { CompanyController } from './company.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompanyService, JwtService],
  controllers: [CompanyController],
  exports: [TypeOrmModule, CompanyService],
})
export class CompanyModule {}
