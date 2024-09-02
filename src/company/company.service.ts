import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  findOne(id: number): Promise<Company | null> {
    return this.companyRepository.findOneBy({ id: id });
  }

  findOneByName(name: string): Promise<Company | null> {
    return this.companyRepository.findOneBy({ name: name });
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }

  async update(
    id: number,
    name: string,
    address: string,
    contact: string,
  ): Promise<void> {
    const company = await this.companyRepository.findOneById(id);
    company.name = name;
    company.address = address;
    company.contact = contact;
    await this.companyRepository.save(company);
  }

  async create(
    name: string,
    address: string,
    contact: string,
    dataSource: DataSource,
  ): Promise<void> {
    const companyLike = {
      name: name,
      address: address,
      contact: contact,
    };
    const company = this.companyRepository.create(companyLike);

    await dataSource.transaction(async (manager) => {
      await manager.save(company);
    });
  }
}
