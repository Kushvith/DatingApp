import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err) {
          switch (err.status) {
            case 400:
              if (err.error.errors) {
                const modalStateError = [];
                for (const key in err.error.errors) {
                  modalStateError.push(key);
                }
                this.toastr.error()
                throw modalStateError;
              }
              else {
                this.toastr.error(err.status, err.statusText);
              }
              break;
            case 404:
              this.router.navigateByUrl("/not-found");
              break;
            case 401:
              this.toastr.error(err.status, err.error);
              break;
            case 500:
              const navitionExtras: NavigationExtras = { state: { error: err.error } }
              this.router.navigateByUrl("/server-error", navitionExtras);
              break;
            case 200:
              this.toastr.success(err.status, err.statusText);
            default:
              this.toastr.error("something went wrong");
              break;
          }
        }
        return throwError(err);
      })
    )
  }
}
