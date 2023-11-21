import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';

export type CatDocument = HydratedDocument<Comments>;

@Schema()
export class Comments {
  @ApiProperty({
    description: '댓글을 작성한 고양이 id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  author: Types.ObjectId;

  @ApiProperty({
    description: '댓글 내용',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: '좋아요 갯수',
    required: true,
  })
  @Prop({
    default: 0,
  })
  @IsPositive() // 양수
  @IsNotEmpty()
  likeCount: number;

  @ApiProperty({
    description: '댓글이 작성된 고양이 id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  info: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
CommentsSchema.set('timestamps', true);
