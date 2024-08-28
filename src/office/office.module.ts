import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeService } from './office.service';
import { JwtService } from '@nestjs/jwt';
import { Office } from './office.entity';
import { OfficeController } from './office.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Office])],
  providers: [OfficeService, JwtService],
  controllers: [OfficeController],
  exports: [TypeOrmModule, OfficeService],
})
export class OfficeModule {}
