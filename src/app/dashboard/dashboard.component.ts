import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: { id: any; password: any; banking: any[]; address: any[]; }[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.userService.getUsersWithDetails().subscribe(
      (userData: { id: any; password: any; banking: any[]; address: any[]; }[]) => {
        this.userData = userData;
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}

