import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    console.log(registerDto);
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }


  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt');

    return res.status(200).json({ message: 'Logout successful' });
  }
}
