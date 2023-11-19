import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  user: User = new User();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user.addedDate = this.getCurrentDate();
    this.user.startDate = this.getCurrentDate();
    this.user.endDate = this.getCurrentDate();
  }

  close(): void {
    this.closeModal.emit();
  }

  getCurrentDate(): any {
    return new Date();
  }

  saveUser() {
    this.userService.createUser(this.user).subscribe({
      next: (data) => {
        console.log(data);
        this.redirectToUserList();
        window.location.reload();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  redirectToUserList() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    console.log(this.user);
    this.close();
    this.saveUser();
  }
}