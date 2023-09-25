import { Injectable } from '@nestjs/common';
import { loginData } from 'src/schema/authSchema';
import { UserRepo } from 'src/users/users.repo';
import { Res } from 'src/utility/response';
import { JwtService } from 'src/utility/services/jwt.service';
import { IRes } from 'src/utility/response';

@Injectable()
export class AuthService implements AuthServiceImpl {
  constructor(
    private repo: UserRepo,
    private res: Res,
    private jwt: JwtService,
  ) {}
  async login(data: loginData): Promise<IRes> {
    const user = await this.repo.login(data);

    console.log(user);

    if (!user) return this.res.fail(400).response();

    delete user.password;

    const token = this.jwt.generateToken(user);
    return this.res.success(token).response();
  }

  async forgotPassword(email: string, password: string): Promise<IRes> {
    const user = await this.repo.update({
      where: { email },
      data: { password },
    });

    return this.res.success(user).response();
  }

  verifyToken(token: string) {
    const data = this.jwt.verifyToken(token);

    if (!data) this.res.fail().response();

    return this.res.success(data).response();
  }
}

interface AuthServiceImpl {
  login(data: loginData): Promise<IRes>;
  forgotPassword(email: string, password: string): Promise<IRes>;
}
