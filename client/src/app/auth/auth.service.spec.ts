import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

fdescribe('AuthService', () => {
  let service: AuthService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    // LocalStorage mock
    let store: {[key: string]: string } = {};

    const mockLocalStorage = {
      getItem: (key: string): string | null => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set token in localstorage', () => {
    service.setSession({ token: "sometoken"});
    expect(localStorage.getItem('token')).toEqual("sometoken");
  })

  it('should return token from localstorage', () => {
    localStorage.setItem('token', 'sometoken');
    expect(service.getToken()).toEqual('sometoken');
  })

  it('should make login request and store returned token', () => {
    const token = "ey.token";
    service.login("user@email.com", "password").subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.token).toBe(token);
    })

    const mockReq = testingController.expectOne('rest/auth/login');
    expect(mockReq.request.method).toBe('POST');
    const mockData = { token };
    mockReq.flush(mockData);
    expect(localStorage.getItem('token')).toEqual(token);
  })

  it('should make register request', () => {
    service.register("user@email.com", "password", "fullname").subscribe(res => {
      expect(res).toBeFalsy();
    });

    const mockReq = testingController.expectOne('rest/auth/register');
    expect(mockReq.request.method).toBe('POST');
  });

  afterEach(() => {
    localStorage.clear();
  })
});
