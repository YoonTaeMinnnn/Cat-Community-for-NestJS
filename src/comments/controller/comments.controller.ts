import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from '../service/comments.service';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsCreateDto } from '../dto/comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOperation({
    summary: '모든 고양이 프로필에 적힌 댓글 가져오기',
  })
  async getAllComments() {}

  @Post(':id')
  @ApiOperation({
    summary: '댓글 작성하기',
  })
  async createComment(
    @CurrentUser() cat,
    @Param('id') id: string,
    @Body() body: CommentsCreateDto,
  ) {
    return this.commentsService.createComment(id, cat.id, body);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '댓글 작성하기',
  })
  async likePlus(@Param('id') id: string) {
    this.commentsService.likePlus(id);
  }
}
