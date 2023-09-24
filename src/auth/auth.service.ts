import { Injectable } from '@nestjs/common';
import { loginData } from 'src/schema/authSchema';
import { UserRepo } from 'src/users/users.repo';
import { Res } from 'src/utility/response';
import { JwtService } from 'src/utility/services/jwt.service';
import { IRes } from 'src/utility/response';

@Injectable()
export class AuthService {
  constructor(
    private repo: UserRepo,
    private res: Res,
    private jwt: JwtService,
  ) {}
  async login(data: loginData): Promise<IRes> {
    const user = await this.repo.login(data);

    if (!user) return this.res.fail(400).response();

    delete user.password;

    const token = this.jwt.generateToken(user);
    return this.res.success(token).response();
  }
}
