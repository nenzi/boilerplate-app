import { Injectable } from '@nestjs/common';
import { UserRepo } from './users.repo';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private repo: UserRepo) {}
  create(data: Prisma.UserCreateInput) {
    return this.repo.create(data);
  }

  update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
    return this.repo.update({ where, data });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
