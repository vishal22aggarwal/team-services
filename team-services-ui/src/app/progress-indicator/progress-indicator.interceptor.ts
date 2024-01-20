import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProgressIndicatorService } from '../service/progress-indicator.service';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
  constructor(private progressIndicatorService: ProgressIndicatorService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.progressIndicatorService.show();

    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.progressIndicatorService.hide();
          }
        },
        () => {
          this.progressIndicatorService.hide();
        }
      )
    );
  }
}