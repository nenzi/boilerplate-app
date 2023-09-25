import { Body, Controller, Post } from '@nestjs/common';
import {
  loginData,
  loginSchema,
  forgotPasswordData,
  forgotPasswordSchema,
} from 'src/schema/authSchema';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/validation/zodPipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body(new ZodValidationPipe(loginSchema)) data: loginData) {
    return this.authService.login(data);
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body(new ZodValidationPipe(forgotPasswordSchema)) data: forgotPasswordData,
  ) {
    return this.authService.forgotPassword(data.email, data.password);
  }
}
