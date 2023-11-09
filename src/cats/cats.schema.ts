import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  id: any;

  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  name: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop()
  imgUrl: string;

  readonly readOnlyData: { id: string; name: string; email: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);
CatSchema.set('timestamps', true);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
