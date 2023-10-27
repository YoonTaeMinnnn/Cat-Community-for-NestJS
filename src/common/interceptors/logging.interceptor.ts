import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...'); // 전처리 : 보통 미들웨어에서 작업

    return next.handle().pipe(
      map((data) => ({
        succes: true,
        data,
      })),
    );
  }
}
