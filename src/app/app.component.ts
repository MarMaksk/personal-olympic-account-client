import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgxPermissionsService} from "ngx-permissions";
import {TokenStorageService} from "./user/service/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'olympic-account';

  constructor(private router: Router,
              private storage: TokenStorageService,
              private permissionsService: NgxPermissionsService,) {

  }

  ngOnInit(): void {
    let roles = this.storage.getRoles()
    this.permissionsService.loadPermissions(roles);
  }
}
