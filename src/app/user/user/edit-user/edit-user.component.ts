import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {UserService} from "../../service/user.service";
import {User} from "../../../user/models/user";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public profileEditForm: FormGroup | any;

  constructor(private dialogRef: MatDialogRef<EditUserComponent>,
              private fb: FormBuilder,
              private notification: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.profileEditForm = this.createProfileForm();
  }

  createProfileForm(): FormGroup {
    return this.fb.group({
        firstname: [this.data.user.firstname, Validators.compose([Validators.required])],
        lastname: [this.data.user.lastname, Validators.compose([Validators.required])],
        bio: [this.data.user.bio, Validators.compose([Validators.required])],
        email: [this.data.user.email, Validators.compose([Validators.email])]
      }
    )
  }

  submit(): void {
    this.userService.updateUser(this.updateUser())
      .subscribe(() => {
        this.notification.showSnackBar("Данные успешно обновлены")
        this.dialogRef.close()
      })
  }

  closeDialog() {
    this.dialogRef.close()
  }

  private updateUser(): User {
    this.data.user.firstname = this.profileEditForm.value.firstname;
    this.data.user.lastname = this.profileEditForm.value.lastname;
    this.data.user.bio = this.profileEditForm.value.bio;
    this.data.user.email = this.profileEditForm.value.email;
    return this.data.user;
  }

}
