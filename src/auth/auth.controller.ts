import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('get-code')
  sendCode(@Body() data: { phone: string }) {
    return this.authService.sendCode(data.phone);
  }

  @Post('get-tokens')
  generateTokens(@Body() data: { phone: string, code: string }) {
    return this.authService.generateTokens(data);
  }

  @Get('refresh-tokens/:refresh-token')
  refreshTokens(@Param('refresh-token') refreshToken: string) {
    return this.authService.refreshTokens(refreshToken);
  }
}
