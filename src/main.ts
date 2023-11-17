import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filer';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 필터 적용
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //데코레이터가 없는 property에는 저장 x
      forbidNonWhitelisted: true, // dto에 존재하지 않는 property를 포함하는 경우, 요청 차단
      transform: true, // spring:httpmessageconvertor역할 ("3" -> 3)
    }),
  );

  // swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // end-poin

  // swagger 보안 설정
  app.use(
    ['docs', 'docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  // cors
  app.enableCors({
    origin: true, // 프론트엔드 도메인을 작성
    credentials: true,
  });

  const port = process.env.PORT;
  await app.listen(port);
}
bootstrap();
