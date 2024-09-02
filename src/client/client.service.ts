import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Client } from './client.entity';
import { UsersService } from 'src/users/users.service';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private usersService: UsersService,
    private companyService: CompanyService,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  findOneByUser(id: number): Promise<Client | null> {
    return this.clientRepository.findOne({ where: { user: { id: id } } });
  }

  findByCompanyId(id: number): Promise<Client[]> {
    return this.clientRepository.find({
      where: { company: { id: id } },
    });
  }

  findOne(id: number): Promise<Client | null> {
    return this.clientRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }

  async create(
    companyId: number,
    userId: number,
    name: string,
    address: string,
    contact: string,
    dataSource: DataSource,
  ): Promise<Client> {
    const company = await this.companyService.findOne(companyId);
    const user = await this.usersService.findOneById(userId);

    const clientLike = {
      name: name,
      address: address,
      contact: contact,
      company: company,
      user: user,
    };

    const client = this.clientRepository.create(clientLike);

    await dataSource.transaction(async (manager) => {
      await manager.save(client);
    });

    return await this.findOne(client.id);
  }

  async update(
    id: number,
    name: string,
    address: string,
    contact: string,
  ): Promise<void> {
    const client = await this.findOne(id);
    client.name = name;
    client.address = address;
    client.contact = contact;
    await this.clientRepository.save(client);
  }
}
