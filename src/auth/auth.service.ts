/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, email, password }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      console.log('🔴 Register process => User already exists');
      throw new BadRequestException('User already exists');
    }
    console.log('🔵 Register process => New user created', {
      name,
      email,
      password,
    });
    const haschedPassword = await bcryptjs.hash(password, 10);
    return await this.userService.create({
      name,
      email,
      password: haschedPassword,
    });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      console.log('🔒 Login process => User not found');
      throw new UnauthorizedException('User not found or not registered');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('🔒 Login process => Invalid password');
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: user.email, sub: user.id };
    const token = await this.jwtService.signAsync(payload);

    console.log('🔓 Login process => User logged in');
    return { token, email };
  }
}
