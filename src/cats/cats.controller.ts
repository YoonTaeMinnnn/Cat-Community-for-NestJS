import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filer';
import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  //@UseFilters(HttpExceptionFilter)
  getCurrentCat() {
    return 'dsa';
  }

  @Post()
  async signUp(@Body() request: CatRequestDto) {
    return await this.catsService.signUp(request);
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
