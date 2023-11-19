import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../services/user.service';
import { UtilService } from '../services/util.service';
import { User } from '../user.model';
import { of } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let utilService: jasmine.SpyObj<UtilService>;

  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserService', ['getUserList', 'getUserBySharedKey']);
    utilService = jasmine.createSpyObj('UtilService', ['advancedSearch', 'exportToCsv']);

    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: UtilService, useValue: utilService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle advanced search', () => {
    const initialShowAdvancedSearch = component.showAdvancedSearch;

    component.toggleAdvancedSearch();
    expect(component.showAdvancedSearch).toBe(!initialShowAdvancedSearch);

    component.toggleAdvancedSearch();
    expect(component.showAdvancedSearch).toBe(initialShowAdvancedSearch);
  });

  it('should submit advanced search', fakeAsync(() => {
    const mockAdvancedSearch: any = {
      sharedKey: 'abc123',
      business_id: 'business123',
      email: 'hamilton@example.com',
      phone: '123456789',
    };
    const mockSearchResults: User[] = [
      {
        id: 1,
        shared_key: 'abc123',
        business_id: 'business123',
        email: 'hamilton@example.com',
        phone: '123456789',
        addedDate: new Date(),
        startDate: new Date(),
        endDate: new Date(),
      },
    ];

    component.advancedSearch = mockAdvancedSearch;
    utilService.advancedSearch.and.returnValue(of(mockSearchResults));

    component.submitAdvancedSearch();
    tick();

    expect(utilService.advancedSearch).toHaveBeenCalledWith(mockAdvancedSearch);
    expect(component.searchResults).toEqual(mockSearchResults);
    expect(component.showAdvancedSearch).toBe(false);
  }));

  it('should clear advanced search', () => {
    component.advancedSearch = {
      sharedKey: 'abc123',
      business_id: 'business123',
      email: 'hamilton@example.com',
      phone: '123456789',
    };

    component.clearAdvancedSearch();

    expect(component.advancedSearch).toEqual({});
  });

  it('should export table to CSV', () => {
    const mockExportData: any[] = [
      {
        shared_key: 'abc123',
        business_id: 'business123',
        email: 'hamilton@example.com',
        phone: '123456789',
        addedDate: new Date(),
        startDate: new Date(),
        endDate: new Date(),
      },
    ];

    component.searchResults = mockExportData;

    component.exportTableToCsv();

    expect(utilService.exportToCsv).toHaveBeenCalledWith(mockExportData, 'exported_data');
  });


  afterEach(() => {
    TestBed.resetTestingModule();
  });
});