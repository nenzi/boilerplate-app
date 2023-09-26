import { Injectable } from '@nestjs/common';
import { UserRepo } from './users.repo';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private repo: UserRepo) {}
  create(data: Prisma.UserCreateInput) {
    return this.repo.create(data);
  }

  update(id: number, data: Prisma.UserUpdateInput) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
