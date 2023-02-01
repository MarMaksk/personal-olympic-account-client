import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../user/service/token-storage.service';
import {UserService} from '../user/service/user.service';
import {Router} from '@angular/router';
import {User} from "../user/models/user";
import {AdminService} from "../account/service/admin.service";
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn = false;
  isDataLoaded = false;
  user: User | any;

  constructor(private tokenService: TokenStorageService,
              private userService: UserService,
              private router: Router,
              private admin: AdminService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      this.userService.getCurrentUser()
        .subscribe(data => {
          this.user = data;
          this.isDataLoaded = true;
        })
    }
  }

  logout(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

  infoAboutUsers() {
    this.admin.infoAboutUsers()
      .subscribe(data => {
        const blob = new Blob([data], {type: 'application/vnd.ms.excel'});
        const file = new File([blob], "Список участников олимпиад" + '.xlsx',
          {type: 'application/vnd.ms.excel'});
        saveAs(file);
      }, error => {
        console.log(error)
      })
  }

}
