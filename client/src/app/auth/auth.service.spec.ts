import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserDetails } from '../model/UserDetails.model';

describe('AuthService', () => {
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

  it('should make login request', () => {
    const token = "ey.token";
    service.login("user@email.com", "password").subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.token).toBe(token);
    })

    const mockReq = testingController.expectOne('rest/auth/login');
    expect(mockReq.request.method).toBe('POST');
    const mockData = { token };
    mockReq.flush(mockData);
  })

  it('should make register request', () => {
    service.register("user@email.com", "password", "fullname").subscribe(res => {
      expect(res).toBeFalsy();
    });

    const mockReq = testingController.expectOne('rest/auth/register');
    expect(mockReq.request.method).toBe('POST');
  });

  it('should return true if user authenticated', () => {
    localStorage.setItem('token', "someToken");
    expect(service.authenticated()).toBeTrue();
    localStorage.clear();
    expect(service.authenticated()).toBeFalse();
  });

  it('should return user from http', () => {
    service.getUser().subscribe(res => {
      expect(res).toBeTruthy();
      expect(res).toEqual(mockData);
    });

    const mockReq = testingController.expectOne('rest/auth/user');
    const mockData: UserDetails = {
      email: "user@email.com",
      fullname: "full username"
    };
    expect(mockReq.request.method).toBe('GET')
  });

  it('should return user from localhost', () => {
    const mockData: UserDetails = {
      email: "user@email.com",
      fullname: "full username"
    };

    service.setUserLocal(mockData);

    service.getUser().subscribe(res => {
      expect(res).toBeTruthy();
      expect(res).toEqual(mockData);
    });

    const mockReq = testingController.expectNone('rest/auth/user');
    expect(mockReq).toBeFalsy();
  });

  afterEach(() => {
    testingController.verify();
    localStorage.clear();
  })
});
