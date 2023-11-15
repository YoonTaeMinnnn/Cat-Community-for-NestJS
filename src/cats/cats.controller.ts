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
  Req,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.response';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getCurrentCat(@CurrentUser() cat) {
    return cat;
  }

  @Post('signIn')
  @ApiOperation({ summary: '로그인' })
  signIn(@Body() request: LoginRequestDto) {
    return this.authService.jwtLogIn(request);
  }

  @Post('signUp')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 500,
    description: 'server error',
  })
  @ApiResponse({
    status: 200,
    description: 'success sign up',
    type: ReadOnlyCatDto,
  })
  @Post()
  async signUp(@Body() request: CatRequestDto) {
    return await this.catsService.signUp(request);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('files', multerOptions('cats')))
  uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() request: LoginRequestDto,
  ) {
    console.log(`${request.email} ---- ${request.password}`);
    console.log(files);
    return 'cat image';
  }
}
