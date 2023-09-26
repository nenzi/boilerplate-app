import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { UserRepo } from './users.repo';
import { PasswordService } from 'src/utility/services/password.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserRepo, PasswordService],
})
export class UsersModule {}
