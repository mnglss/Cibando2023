import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';
import moment from 'moment'; // Casting

@Component({
  selector: 'app-profile',
  imports: [NgIf, DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User;
  data: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    if (JSON.parse(localStorage.getItem('userData')) !== null) {
      this.user = JSON.parse(localStorage.getItem('userData'));
    }

    if (this.user){
      this.userService.getUserProfile(this.user.email).subscribe(res => {
        this.user = res;
        moment.locale('it'); // Imposta la lingua italiana per moment.js
        this.data = moment(this.user.createdAt).format('DD/MM/YYYY'); // Formatta la data in italiano
        }
      );
    }
  }

}
