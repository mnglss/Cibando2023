import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    if (JSON.parse(localStorage.getItem('userData')) !== null) {
      this.user = JSON.parse(localStorage.getItem('userData'));
    }

    if (this.user){
      this.userService.getUserProfile(this.user.email).subscribe(res => this.user = res);
    }
  }

}
