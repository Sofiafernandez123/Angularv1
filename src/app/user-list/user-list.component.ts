import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
  
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  searchTerm: string = '';
  private subscription!: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  filteredUsers(): User[] {
    return this.users.filter(user => 
      `${user.name.firstname} ${user.name.lastname}`.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.phone.includes(this.searchTerm) ||
      `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

