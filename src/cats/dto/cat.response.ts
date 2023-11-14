import { OmitType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends OmitType(Cat, [
  'password',
  'imgUrl',
] as const) {}
