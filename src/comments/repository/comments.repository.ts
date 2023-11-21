import { InjectModel } from '@nestjs/mongoose';
import { Comments } from '../comments.schema';
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comments.name) private readonly commentModel: Model<Comments>,
  ) {}

  async createComment(
    id: Types.ObjectId,
    authorId: Types.ObjectId,
    content: string,
  ) {
    return await this.commentModel.create({
      info: id,
      author: authorId,
      content: content,
    });
  }

  async findById(id: string) {
    return await this.commentModel.findById(id);
  }
}
