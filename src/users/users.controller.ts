import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { ZodValidationPipe } from 'src/validation/zodPipe';
import {
  CreateUserSchema,
  UpdateUserSchema,
  updateWhereSchema,
} from 'src/schema/userSchema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(CreateUserSchema)) data: Prisma.UserCreateInput,
  ) {
    return this.usersService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Query(new ZodValidationPipe(updateWhereSchema))
    where: Prisma.UserWhereUniqueInput,
    @Body(new ZodValidationPipe(UpdateUserSchema))
    data: Prisma.UserUpdateInput,
  ) {
    return this.usersService.update(where, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
