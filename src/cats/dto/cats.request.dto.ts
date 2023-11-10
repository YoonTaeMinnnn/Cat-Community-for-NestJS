import { OmitType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class CatRequestDto extends OmitType(Cat, ['id', 'imgUrl'] as const) {}
