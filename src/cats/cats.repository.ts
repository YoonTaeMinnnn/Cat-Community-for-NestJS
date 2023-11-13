import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findByEmail(email: string): Promise<Cat | null> {
    return await this.catModel.findOne({ email });
  }

  async existsByEmail(email: string) {
    try {
      const result = await this.catModel.exists({ email });
      return result;
    } catch (e) {
      throw new HttpException('db erorr', 400);
    }
  }

  async create(
    email: string,
    name: string,
    hashedPassword: string,
  ): Promise<Cat> {
    return await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });
  }
}
