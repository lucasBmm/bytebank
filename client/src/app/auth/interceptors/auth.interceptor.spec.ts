import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => TestBed.runInInjectionContext(() => authInterceptor(req, next));
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let tokenService: TokenService;
  const url = "http://localhost";
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    tokenService = TestBed.inject(TokenService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should not inject authorization header when user is not authenticated', () => {
    const tokenServiceSpy = spyOn(tokenService, 'getToken').and.returnValue(null);

    httpClient.get(url).subscribe({
      complete: () => {
        expect(tokenServiceSpy).toHaveBeenCalledTimes(1);
      }
    });

    const req = httpTestingController.expectOne(url);
    req.flush({ });
    expect(req.request.headers.has('Authorization')).toBeFalse();
  });

  it('should inject authorization header when user is authenticated', () => {
    const token = "someToken";
    const tokenServiceSpy = spyOn(tokenService, 'getToken').and.returnValue(token);

    httpClient.post(url, {}).subscribe({
      complete: () => {
        expect(tokenServiceSpy).toHaveBeenCalledTimes(1);
      }
    });
    const req = httpTestingController.expectOne(url);
    expect(req.request.headers.has('Authorization')).toBeTrue();
  });

  it('should call #removeToken if request is unauthorized and redirect to login page', () => {
    const token = "someToken";
    const tokenServiceSpy = spyOn(tokenService, 'getToken').and.returnValue(token);
    const removeTokenSpy = spyOn(tokenService, 'removeToken');

    const redirectSpy = spyOn(router, 'navigate');

    httpClient.post(url, {}).subscribe({
      complete: () => {
        expect(tokenServiceSpy).toHaveBeenCalledTimes(1);
      },
      error: (error) => {}
    });
    const req = httpTestingController.expectOne(url);

    req.error(new ProgressEvent('Error'), { status: 401});
    expect(removeTokenSpy).toHaveBeenCalledTimes(1);
    expect(redirectSpy).toHaveBeenCalledWith(['login']);
  });
});
