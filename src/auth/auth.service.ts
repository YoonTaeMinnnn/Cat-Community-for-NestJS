import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtModule } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  // 로그인 검사 함수
  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;
    const result = await this.catsRepository.findByEmail(email);
    if (!result) {
      throw new UnauthorizedException('이메일과 패스워드를 확인해주세요');
    }

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      result.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 패스워드를 확인해주세요');
    }

    const payload = { email, id: result.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
