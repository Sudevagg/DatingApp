import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/Pagination';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
  
})
export class MemberListComponent implements OnInit {
users: User[];
user: User = JSON.parse(localStorage.getItem('user'));
genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
userParms: any = {};
pagination: Pagination;
  constructor(private alertify: AlertifyService,private userService: UserService,private route: ActivatedRoute) { } 

  ngOnInit() {
     this.route.data.subscribe(data => {
       this.users = data['users'].result;
       this.pagination = data['users'].pagination;
     });
     this.userParms.gender = this.user.gender === 'female' ? 'male' : 'female';
     this.userParms.minAge = 18;
     this.userParms.maxAge = 99;
     this.userParms.orderBy = 'lastActive';
      }
  pageChanged(event: any): void {
  
    this.pagination.currentPage = event.page;
    console.log(this.pagination.currentPage);
    this.loadUsers();
  }

  resetFilters()
  {
    this.userParms.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParms.minAge = 18;
    this.userParms.maxAge = 99;

    this.loadUsers();
  }

  loadUsers()
  {
    console.log(this.pagination.currentPage,this.pagination.itemsPerPage);
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParms)
     .subscribe((res: PaginatedResult<User[]>) => {
this.users = res.result;
this.pagination = res.pagination;
console.log(res);
    }, error => {
      this.alertify.error(error);
    });
  }

}
