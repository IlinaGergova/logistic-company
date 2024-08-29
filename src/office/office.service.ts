import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Office } from './office.entity';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class OfficeService {
  constructor(
    @InjectRepository(Office)
    private officeRepository: Repository<Office>,
    private companyService: CompanyService,
  ) {}

  findAll(): Promise<Office[]> {
    return this.officeRepository.find();
  }

  findByCompanyId(id: number): Promise<Office[]> {
    return this.officeRepository.find({
      where: { company: { id: id } },
    });
  }

  findOne(id: number): Promise<Office | null> {
    return this.officeRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.officeRepository.delete(id);
  }

  async create(
    companyId: number,
    name: string,
    address: string,
    contact: string,
    info: string,
    dataSource: DataSource,
  ): Promise<Office> {
    const company = await this.companyService.findOne(companyId);

    const officeLike = {
      name: name,
      address: address,
      contact: contact,
      info: info,
      company: company,
    };

    const office = this.officeRepository.create(officeLike);

    await dataSource.transaction(async (manager) => {
      await manager.save(office);
    });

    return await this.findOne(office.id);
  }

  async update(
    id: number,
    name: string,
    address: string,
    contact: string,
    info: string,
  ): Promise<void> {
    const office = await this.findOne(id);
    office.name = name;
    office.address = address;
    office.contact = contact;
    office.info = info;
    await this.officeRepository.save(office);
  }
}
