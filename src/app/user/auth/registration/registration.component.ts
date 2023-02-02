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
      username: ['', Validators.compose([Validators.required,
        Validators.pattern('[a-zA-Z1-9]{4,7}')])],
      password: ['', Validators.compose([Validators.required,
        Validators.pattern('[a-zA-Z1-9]{4,16}')])],
      confirmPassword: ['', Validators.compose([Validators.required,
        Validators.pattern('[a-zA-Z1-9]{4,16}')])],
    })
  }

  submit(): void {
    this.authService.register({
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    }).subscribe(data => {
      this.tokeStorage.saveToken(data.token)
      this.tokeStorage.saveUser(data)
      this.tokeStorage.saveId(data.id)
      this.tokeStorage.saveRoles(data.roles)
      this.notificationService.showSnackBar("Регистрация прошла успешно")
      this.router.navigate(['/main'])
      // window.location.reload();
    }, error => {
      this.notificationService.showSnackBar("Логин и пароль должны содержать минимум 4 символа")
    })
  }
}
