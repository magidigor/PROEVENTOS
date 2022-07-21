import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorField } from '@app/helpers/validatorField';
import { User } from '@app/models/Identity/User';
import { AccountService } from '@app/services/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user = {} as User;
  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder,
              private accountServive: AccountService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private toaster: ToastrService) { }

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmePassword')
    };

    this.form = this.fb.group({
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmePassword: ['', Validators.required],
    }, formOptions);
  }

  public resetForm(){
    this.form.reset();
  }

  register (): void {
    this.spinner.show();
    this.user = { ... this.form.value } ;
    this.accountServive.register(this.user).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
      },
      error: (error: any) => {
        this.toaster.error('Erro ao tentar registar usuário', 'Erro!');
        console.error(error);
      }
    }).add(() => this.spinner.hide());
  }
}
