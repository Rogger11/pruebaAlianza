import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { UserCreateComponent } from './user-create.component';
import { UserService } from '../services/user.service';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: Router;

  beforeEach(() => {
    userService = jasmine.createSpyObj('UserService', ['createUser']);
    TestBed.configureTestingModule({
      declarations: [UserCreateComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [{ provide: UserService, useValue: userService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal', () => {
    spyOn(component.closeModal, 'emit');

    component.close();

    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should save user and navigate to user list', fakeAsync(() => {
    const mockUser = {
      id: 1,
      shared_key: 'abc123',
      business_id: 'business123',
      email: 'hamilton@example.com',
      phone: '123456789',
      addedDate: new Date(),
      startDate: new Date(),
      endDate: new Date(),
    };

    userService.createUser.and.returnValue(of(mockUser));
    spyOn(window.location, 'reload');

    component.user = mockUser;
    component.saveUser();

    tick(); // Simulate passage of time until all pending asynchronous activities finish

    expect(userService.createUser).toHaveBeenCalledWith(mockUser);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(window.location.reload).toHaveBeenCalled();
  }));

  it('should handle error when saving user', fakeAsync(() => {
    const mockError = new Error('Test error');

    userService.createUser.and.returnValue(throwError(mockError));
    spyOn(console, 'log');

    component.user = {
      id: 1,
      shared_key: 'abc123',
      business_id: 'business123',
      email: 'hamilton@example.com',
      phone: '123456789',
      addedDate: new Date(),
      startDate: new Date(),
      endDate: new Date(),
    };
    component.saveUser();

    tick(); // Simulate passage of time until all pending asynchronous activities finish

    expect(userService.createUser).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(mockError);
    // Ensure other error handling mechanisms as needed
  }));
});
