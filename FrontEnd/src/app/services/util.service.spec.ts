import { TestBed } from '@angular/core/testing';
import { UtilService } from './util.service';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../user.model';

describe('UtilService', () => {
  let utilService: UtilService;
  let userService: jasmine.SpyObj<UserService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getApi']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UtilService,
        { provide: UserService, useValue: userServiceSpy },
      ],
    });

    utilService = TestBed.inject(UtilService);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(utilService).toBeTruthy();
  });

  it('should export to CSV', () => {
    const mockResults: User[] = [
      { id: 1, shared_key: 'abc123', business_id: 'business123', email: 'john@example.com', phone: '123456789', addedDate: new Date(), startDate: new Date(), endDate: new Date() },
    ];

    const mockFileName = 'exported_data';
    utilService.exportToCsv(mockResults, mockFileName);

    const linkElement: HTMLAnchorElement = document.createElement('a');
    spyOn(document, 'createElement').and.returnValue(linkElement);
    spyOn(linkElement, 'setAttribute');
    spyOn(linkElement, 'click');
    spyOn(linkElement, 'remove');

    expect(document.createElement).toHaveBeenCalled();
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(linkElement.setAttribute).toHaveBeenCalledWith('href', jasmine.any(String));
    expect(linkElement.setAttribute).toHaveBeenCalledWith('download', `${mockFileName}.csv`);
    expect(linkElement.click).toHaveBeenCalled();
    expect(linkElement.remove).toHaveBeenCalled();
  });

  it('should call advancedSearch', () => {
    const mockResults: User[] = [
      { id: 1, shared_key: 'abc123', business_id: 'business123', email: 'hamilton@example.com', phone: '123456789', addedDate: new Date(), startDate: new Date(), endDate: new Date() },
    ];

    const criteria = { sharedKey: 'abc123' };

    userService.getApi.and.returnValue('http://127.0.0.1:8080');
    utilService.advancedSearch(criteria).subscribe((results) => {
      expect(results).toEqual(mockResults);
    });

    const req = httpTestingController.expectOne('http://127.0.0.1:8080/clientes/advanced-search');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(criteria);

    req.flush(mockResults);
    httpTestingController.verify();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
