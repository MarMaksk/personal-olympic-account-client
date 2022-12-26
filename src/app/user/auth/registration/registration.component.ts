import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../user/service/auth.service";
import {TokenStorageService} from "../../../user/service/token-storage.service";
import {NotificationService} from "../../../user/service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registerForm: FormGroup | any;

  constructor(
    private authService: AuthService,
    private tokeStorage: TokenStorageService,
    private notificationService: NotificationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    if (this.tokeStorage.getUser()) {
      this.router.navigate(['main']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.createRegisterForm()
  }

  private createRegisterForm() {
    return this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])],
    })
  }

  submit(): void {
    this.authService.register({
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      confirmPassword: this.registerForm.value.confirmPassword
    }).subscribe(data => {
      this.tokeStorage.saveToken(data.token)
      this.tokeStorage.saveUser(data)
      this.tokeStorage.saveRoles(data.roles)
      this.notificationService.showSnackBar("Successfully logged in")
      this.router.navigate(['/main'])
      window.location.reload();
    }, error => {
      console.log(error);
      this.notificationService.showSnackBar(error.message)
    })
  }
}
