import {Component, OnInit} from '@angular/core';
import {User} from "../../../user/models/user";
import {TokenStorageService} from "../../service/token-storage.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {UserService} from "../../service/user.service";
import {EditUserComponent} from "../edit-user/edit-user.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User | any;
  isUserDataLoaded = false;

  constructor(private tokenStorage: TokenStorageService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true
      })
  }

  map = new Map();

  openEditDialog(): void {
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '400px'
    dialogUserEditConfig.data = {
      user: this.user
    }
    this.dialog.open(EditUserComponent, dialogUserEditConfig)
  }

}
