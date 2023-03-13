import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() body: UserLoginDto) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }
  @Post('/signup')
  signUp(@Body() createUserDTO: UserLoginDto) {
    return this.authService.signUp(createUserDTO);
  }
}
