import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  private addTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.getToken();
    if (request.url.includes('/login')) {
      return request;
    }
    // Không thêm token cho request khi call login
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'x-api-key': 'reqres-free-v1',
        },
      });
    }
    return request;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //Them token vào header của request
    const authRequest = this.addTokenToRequest(request);
    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          // case 401:
          //   this.router.navigate(['/login']);
          //   throw error;
          case 400:
            console.log('Check ', error);
            alert('Đăng nhập thất bại! Vui lòng thử lại');
            break;
          case 401:
            // Lỗi 401 Unauthorized: Người dùng chưa được xác thực hoặc token hết hạn/không hợp lệ
            alert(
              'Unauthorized: Your session has expired or is invalid. Please log in again.'
            );
            this.authService.logout(); // Gọi hàm đăng xuất để xóa token, v.v.
            this.router.navigate(['/login']); // Chuyển hướng về trang đăng nhập
            break;
          case 403:
            // Lỗi 403 Forbidden: Đã xác thực nhưng không có quyền truy cập tài nguyên
            alert(
              'Forbidden: You do not have permission to access this resource.'
            );
            this.router.navigate(['/access-denied']); // Chuyển hướng đến trang báo lỗi quyền truy cập
            break;
          case 500:
            // Lỗi 500 Internal Server Error: Lỗi server chung
            alert('Internal Server Error: Something went wrong on the server.');
            break;
          default:
            // Các lỗi khác
            alert('An unexpected error occurred. Please try again.');
            break;
        }

        return throwError(() => error);
      })
    );
  }
}
