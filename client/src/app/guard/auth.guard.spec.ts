import { TestBed, fakeAsync } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

// This test idea come from: https://levelup.gitconnected.com/authguard-authguard-unit-test-with-angular-16-c46738532cdd
describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  const urlPath = '/dataset'
  // const expectedUrl = 'login';
  // const expectedQueryParams = { loggedOut: true, origUrl: urlPath };

  beforeEach(() => {
    authService = jasmine.createSpyObj(authGuard, ['authenticated']);
    router = jasmine.createSpyObj(authGuard, ['navigate', 'createUrlTree', 'parseUrl']);

    router.parseUrl.and.callFake((url: string) => {
      const urlTree = new UrlTree()
      const urlSegment = new UrlSegment( url, {})
      urlTree.root = new UrlSegmentGroup( [urlSegment], {})
      return urlTree
    });
    TestBed.configureTestingModule( {
      providers: [
        {
          provide: Router,
          useValue: router
        },
        {
          provide: AuthService,
          useValue: authService
        },
      ]
    });
  });

  it('should return false if the user is not logged in ', fakeAsync(async () => {
    mockIsLoggedInFalse()
    const authenticated = await runAuthGuardWithContext(getAuthGuardWithDummyUrl(urlPath))
    expect(authenticated).toBeFalsy()
  }))

  it('should return true if the user is logged in ', fakeAsync(async () => {
    mockIsLoggedInTrue()
    const authenticated = await runAuthGuardWithContext(getAuthGuardWithDummyUrl(urlPath))
    expect(authenticated).toBeTruthy()
  }))

  // it('should redirect to login with originalUrl and loggedOut url parameters if the user is not logged in ', fakeAsync(async () => {
  //   mockIsLoggedInFalse()
  //   const authenticated = await runAuthGuardWithContext(getAuthGuardWithDummyUrl(urlPath))
  //   expect(router.createUrlTree).toHaveBeenCalledOnceWith([router.parseUrl(expectedUrl)],  { queryParams: expectedQueryParams })
  //   expect(authenticated).toBeFalsy()
  // }))

  // it('should redirect to login with originalUrl and loggedOut url parameters if catches an error ', fakeAsync(async () => {
  //   authService.authenticated.and.returnValue(false);
  //   const authenticated = await runAuthGuardWithContext(getAuthGuardWithDummyUrl(urlPath))
  //   expect(router.navigate).toHaveBeenCalledOnceWith([expectedUrl],  { queryParams: expectedQueryParams })
  //   expect(authenticated).toBeFalsy()
  // }))

  function getAuthGuardWithDummyUrl(urlPath: string): () => boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    const dummyRoute = new ActivatedRouteSnapshot( )
    dummyRoute.url = [ new UrlSegment(urlPath, {}) ]
    const dummyState: RouterStateSnapshot = { url: urlPath, root:  new ActivatedRouteSnapshot() }
    return () => authGuard(dummyRoute, dummyState)
  }

  async function runAuthGuardWithContext(authGuard: () => boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>): Promise<boolean | UrlTree> {
    const result = TestBed.runInInjectionContext(authGuard)
    const authenticated = result instanceof Observable ? await handleObservableResult(result) : result;
    return authenticated
  }

  function handleObservableResult(result: Observable<boolean | UrlTree>): Promise<boolean | UrlTree> {
    return new Promise<boolean | UrlTree>((resolve) => {
      result.subscribe((value) => {
        resolve(value);
      });
    });
  }

  const mockIsLoggedInTrue = () => {
    authService.authenticated.and.returnValue(true);
  }

  const mockIsLoggedInFalse = () => {
    authService.authenticated.and.returnValue(false);
  }
});
