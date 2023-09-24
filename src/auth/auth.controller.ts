import { Body, Controller, Post } from '@nestjs/common';
import { loginData, loginSchema } from 'src/schema/authSchema';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/validation/zodPipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body(new ZodValidationPipe(loginSchema)) data: loginData) {
    return this.authService.login(data);
  }
}
