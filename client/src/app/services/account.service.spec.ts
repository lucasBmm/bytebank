import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { AccountService } from './account.service';
import { IBalance } from '../model/IBalance.interface';

describe('AccountService', () => {
  let service: AccountService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(AccountService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user balance', () => {
    service.getBalance().subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.balance).toEqual(100);
    })

    const mockReq = testingController.expectOne('rest/account/balance');
    expect(mockReq.request.method).toEqual('GET');
    const mockData: IBalance = { balance: 100 };
    mockReq.flush(mockData);
  })

  it('should add on user balance', () => {
    service.addBalance(50).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.balance).toEqual(150);
    });

    const mockReq = testingController.expectOne('rest/account/deposit')
    expect(mockReq.request.method).toEqual('POST');
    const mockData: IBalance = { balance: 150 };
    mockReq.flush(mockData);
  })

  afterEach(() => {
    testingController.verify();
  })
});
