import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filer';
import { CatsService } from './cats.service';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  //@UseFilters(HttpExceptionFilter)
  getAllCat() {
    return { cat: 'all cats' };
  }

  @Get('/:id')
  getOneCat(@Param('id') id: number) {
    throw new HttpException('id is not found', 404);
    return `id = ${id} cat`;
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put('/:id')
  updateCat(@Param('id') id: number) {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat(@Param('id') id: number) {
    return 'update partial cat';
  }

  @Delete(':id')
  deleteCat(@Param('id') id: number) {
    return 'delete cat';
  }
}
