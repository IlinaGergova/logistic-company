import { Controller } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ClientService } from './client.service';

@Controller()
export class ClientController {
  constructor(
    private clientService: ClientService,
    private dataSource: DataSource,
  ) {}
}
