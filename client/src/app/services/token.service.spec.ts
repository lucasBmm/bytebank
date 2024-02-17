import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

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

    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set token in localstorage', () => {
    service.setToken({ token: "sometoken"});
    expect(localStorage.getItem('token')).toEqual("sometoken");
  });

  it('should return token from localstorage', () => {
    localStorage.setItem('token', 'sometoken');
    expect(service.getToken()).toEqual('sometoken');
  });

  it('should remove token from localstorage', () => {
    localStorage.setItem('token', 'sometoken');
    service.removeToken();
    expect(localStorage.getItem('token')).toBeFalsy();
  });
});
