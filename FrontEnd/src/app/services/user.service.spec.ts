import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../user.model';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should retrieve user list', () => {
    const mockUsers: User[] = [
      { id: 1, shared_key: 'abc123', business_id: 'business123', email: 'john@example.com', phone: '123456789', addedDate: new Date(), startDate: new Date(), endDate: new Date() },
      // Add more mock users as needed
    ];

    userService.getUserList().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne(`${userService.getApi()}/clientes`);
    expect(req.request.method).toBe('GET');

    req.flush(mockUsers);
  });

  it('should create a new user', () => {
    const newUser: User = {
      id: 2,
      shared_key: 'newuser123',
      business_id: 'business456',
      email: 'newuser@example.com',
      phone: '987654321',
      addedDate: new Date(),
      startDate: new Date(),
      endDate: new Date(),
    };

    userService.createUser(newUser).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${userService.getApi()}/clientes`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);

    req.flush({}); // Mock successful response
  });

  it('should retrieve user by shared key', () => {
    const sharedKey = 'abc123';
    const mockUsers: User[] = [
      { id: 1, shared_key: sharedKey, business_id: 'business123', email: 'john@example.com', phone: '123456789', addedDate: new Date(), startDate: new Date(), endDate: new Date() },
    ];

    userService.getUserBySharedKey(sharedKey).subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne(`${userService.getApi()}/clientes/bySharedKey?sharedKey=${sharedKey}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockUsers);
  });
});
