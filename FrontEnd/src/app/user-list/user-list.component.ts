import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UtilService } from '../services/util.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  showAdvancedSearch: boolean = false;
  advancedSearch: any = {};
  searchTerm: string = '';
  searchResults: User[] | undefined
  isModalOpen = false;;
  users: User[] | undefined;

  constructor(private userService: UserService, private router: Router, private utilService: UtilService) {
  }

  public isModalOpened(): boolean {
    return this.isModalOpen;
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  search(): void {
    this.userService.getUserBySharedKey(this.searchTerm).subscribe(
      (results) => {
        this.searchResults = results;
        this.users = results || this.users;
      },
      (error) => {
        console.error("Error fetching search results:", error);
        this.searchResults = [];
      }
    );
  }

  toggleAdvancedSearch(): void {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  submitAdvancedSearch(): void {
    const searchParams: any = {};
    if (this.advancedSearch.sharedKey) {
      searchParams.sharedKey = this.advancedSearch.sharedKey;
    }
    if (this.advancedSearch.business_id) {
      searchParams.business_id = this.advancedSearch.business_id;
    }
    if (this.advancedSearch.email) {
      searchParams.email = this.advancedSearch.email;
    }
    if (this.advancedSearch.phone) {
      searchParams.phone = this.advancedSearch.phone;
    }

    this.utilService.advancedSearch(searchParams).subscribe(
      (results: User[]) => {
        this.searchResults = results;
      },
      (error: any) => {
        console.error("Error fetching advanced search results:", error);
        this.searchResults = [];
      }
    );
    this.showAdvancedSearch = false;
  }

  clearAdvancedSearch(): void {
    this.advancedSearch = {};
    this.getUsers();
  }

  exportTableToCsv(): void {
    const dataToExport: any[] = this.searchResults || this.users || [];
    this.utilService.exportToCsv(dataToExport, 'exported_data');
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUserList().subscribe(data => {
      this.users = data;
    });
  }
}
