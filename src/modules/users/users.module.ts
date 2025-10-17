import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseSeederService } from 'src/database/database-seeder.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role]),
        AuthModule,
    ],
    providers: [UsersService, DatabaseSeederService],
    controllers: [UsersController],
})
export class UsersModule { }
