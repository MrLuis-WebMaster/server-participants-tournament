import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    res.redirect('http://localhost:3000/');
  }

  @Get('logout')
  logout(@Req() req, @Res() res) {
    req.logout();
    res.redirect('http://localhost:3000/');
  }

  @Post('generateToken')
  generateToken(@Body() data: { fullName: string; email: string }) {
    return this.authService.generateToken(data);
  }
}
