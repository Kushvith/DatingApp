import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusyService } from '../_services/busy.service';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class BusyInterceptor implements HttpInterceptor {

  constructor(private busyservice: BusyService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.busyservice.busy();
    return next.handle(request).pipe(
      delay(1000),
      finalize(() => {
        this.busyservice.idle();
      })
    );
  }
}
