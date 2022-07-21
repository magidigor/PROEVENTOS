import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '@app/models/Identity/UserLogin';
import { AccountService } from '@app/services/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model = {} as UserLogin;

  constructor(private accountServive: AccountService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.spinner.show();

    this.accountServive.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
      },
      error: (error: any) => {
        if (error.status == 401)
          this.toaster.error('Usuário ou senha inválido', 'Erro!');
        else console.error(error);
      }
    }).add(() => this.spinner.hide());
  }

}
