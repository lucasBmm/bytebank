import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { HomeComponent } from './home.component';
import { AccountComponent } from '../../ui/account/account.component';
import { LeftNavigationComponent } from '../../ui/left-navigation/left-navigation.component';
import { CardSessionComponent } from '../../ui/card-session/card-session.component';
import { BankStatementComponent } from '../../ui/bank-statement/bank-statement.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        MockComponent(AccountComponent),
        MockComponent(LeftNavigationComponent), 
        MockComponent(CardSessionComponent), 
        MockComponent(BankStatementComponent)
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
