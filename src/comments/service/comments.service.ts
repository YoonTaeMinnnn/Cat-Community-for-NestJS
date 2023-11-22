import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsCreateDto } from '../dto/comment.dto';
import { CommentsRepository } from '../repository/comments.repository';
import { CatsRepository } from 'src/cats/repository/cats.repository';
import mongoose, { Types } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly catsRepository: CatsRepository,
  ) {}
  async getAllComments() {}

  async createComment(
    id: string,
    authorId: Types.ObjectId,
    body: CommentsCreateDto,
  ) {
    const content = body.content;
    const validTargetCat =
      await this.catsRepository.findByIdWithoutPassword(id);
    if (!validTargetCat) {
      throw new NotFoundException('해당 고양이가 존재하지 않습니다.');
    }
    return await this.commentsRepository.createComment(
      new mongoose.Types.ObjectId(validTargetCat.id),
      new mongoose.Types.ObjectId(authorId),
      content,
    );
  }

  async likePlus(id: string) {
    const findComment = await this.commentsRepository.findById(id); // Document 반환
    if (!findComment) {
      throw new NotFoundException('해당 고양이가 존재하지 않습니다.');
    }
    findComment.likeCount += 1;
    findComment.save();
  }
}
