import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../user/service/auth.service";
import {TokenStorageService} from "../../../user/service/token-storage.service";
import {NotificationService} from "../../../user/service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup | any;

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
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.compose([Validators.required,
        Validators.pattern('[a-zA-Z1-9]{4,7}')])],
      password: ['', Validators.compose([Validators.required,
        Validators.pattern('[a-zA-Z1-9]{4,16}')])]
    })
  }

  submit(): void {
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe(data => {
      this.tokeStorage.saveToken(data.token)
      this.tokeStorage.saveUser(data)
      this.tokeStorage.saveId(data.id)
      this.tokeStorage.saveRoles(data.roles)
      this.notificationService.showSnackBar("Авторизация прошла успешно")
      if (data.roles.indexOf('ROLE_ADMIN') !== -1)
        this.router.navigate(['/admin-panel'])
      else
        this.router.navigate(['/main'])
    }, error => {
      this.notificationService.showSnackBar("Неверный логин/пароль")
    })
  }

}
