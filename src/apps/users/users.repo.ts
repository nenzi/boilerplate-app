import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User, Prisma } from '@prisma/client';
import { loginData } from 'src/schema/authSchema';
import { PasswordService } from 'src/utility/services/password.service';

@Injectable()
export class UserRepo {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const hashPassword = await this.passwordService.hashPassword(data.password);
    data.password = hashPassword;
    return this.prisma.user.create({
      data,
    });
  }
  async find(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findAll(): Promise<User[]> {
    const data = await this.prisma.user.findMany();
    return data;
  }

  async login(data: loginData): Promise<User> | null {
    const { email, password } = data;

    console.log(email, password);

    const user = await this.prisma.user.findFirst({ where: { email } });

    if (
      user &&
      (await this.passwordService.comparePassword(password, user.password))
    ) {
      return user;
    }
    return null;
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    if (data.password) {
      data.password = await this.passwordService.hashPassword(
        data.password.toString(),
      );
    }

    return this.prisma.user.update({
      data: { ...data },
      where: { id },
    });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async forgotPassword(email: string, password: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return false;
    password = await this.passwordService.hashPassword(password.toString());

    this.prisma.user.update({
      data: { password },
      where: { email },
    });
    return true;
  }
}
