import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UserSession } from 'app/shared/services/user-session';

@Injectable()
export class TokenAndDefaultParamsInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Authorization': `Token ${UserSession.getToken()}`,
        'AppRole': '2'
      }
    });

    return next.handle(request);
  }
}