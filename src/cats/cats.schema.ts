import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Comments } from 'src/comments/comments.schema';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @ApiProperty({
    example: 'dsadasdasdsadas',
    description: 'id',
    required: true,
  })
  id: any;

  @ApiProperty({
    example: 'test@test.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '냥냥이',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    name: string;
    email: string;
    comments: Comments[];
  };

  readonly comments: Comments[];
}

const _CatSchema = SchemaFactory.createForClass(Cat);
_CatSchema.set('timestamps', true);
_CatSchema.set('collection', 'cats'); // 컬렉션 이름 지정

// 실제 DB에 저장되지 않는 가상의 데이터
// 조회할때 사용
_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    comments: this.comments,
  };
});

_CatSchema.virtual('comments', {
  ref: 'comments', // 스키마 이름
  localField: '_id',
  foreignField: 'info',
});
_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
