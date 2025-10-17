import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/modules/users/entities/role.entity';

@Injectable()
export class DatabaseSeederService {
  private readonly logger = new Logger(DatabaseSeederService.name);

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async seed() {
    const existingRoles = await this.roleRepository.count();
    if (existingRoles === 0) {
      this.logger.log('Seeding roles...');
      await this.roleRepository.save([
        { name: 'user' },
        { name: 'admin' },
      ]);
      this.logger.log('Roles seeded successfully.');
    } else {
      this.logger.log('Roles already exist, skipping seeding.');
    }
  }
}
