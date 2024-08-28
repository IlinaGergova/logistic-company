import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageService } from './package.service';
import { JwtService } from '@nestjs/jwt';
import { Package } from './package.entity';
import { PackageController } from './package.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Package])],
  providers: [PackageService, JwtService],
  controllers: [PackageController],
  exports: [TypeOrmModule, PackageService],
})
export class PackageModule {}
