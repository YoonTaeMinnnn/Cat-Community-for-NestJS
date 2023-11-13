import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CatsModule } from 'src/cats/cats.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => CatsModule), // 순환 참조 방지
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
