import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from './client.service';
import { JwtService } from '@nestjs/jwt';
import { Client } from './client.entity';
import { ClientController } from './client.controller';
import { Company } from 'src/company/company.entity';
import { CompanyService } from 'src/company/company.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Company, User])],
  providers: [ClientService, JwtService, CompanyService, UsersService],
  controllers: [ClientController],
  exports: [TypeOrmModule, ClientService],
})
export class ClientModule {}
