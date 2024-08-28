import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Office } from './office.entity';

@Injectable()
export class OfficeService {
  constructor(
    @InjectRepository(Office)
    private officeRepository: Repository<Office>,
  ) {}
}
