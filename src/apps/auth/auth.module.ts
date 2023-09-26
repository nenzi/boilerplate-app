import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from 'src/utility/services/password.service';
import { UserRepo } from 'src/apps/users/users.repo';
import { Res } from 'src/utility/response';
import { JwtService } from 'src/utility/services/jwt.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AuthController],
  imports: [Res],
  providers: [
    AuthService,
    PasswordService,
    Res,
    JwtService,
    PrismaService,
    UserRepo,
  ],
})
export class AuthModule {}
