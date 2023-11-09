import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import { CatRequestDto } from './dto/cats.request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async signUp(request: CatRequestDto) {
    const { email, name, password } = request;
    const isCatExist = await this.catModel.exists({ email });
    if (isCatExist) {
      throw new UnauthorizedException('해당 고양이는 이미 존재합니다.'); // 403
    }
    const hashedPassword = await bcrypt.hash(password, 10); // 해시 암호화
    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });
    return cat.readOnlyData;
  }
}
