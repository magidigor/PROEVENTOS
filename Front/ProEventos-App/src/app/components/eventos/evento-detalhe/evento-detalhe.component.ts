import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  evento = {} as Evento;
  eventoId =  0;
  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumber: false
    };
  };

  constructor(private fb: FormBuilder,
              private localeService: BsLocaleService,
              private router: ActivatedRoute,
              private eventoService: EventoService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService)
  {
    this.localeService.use('pt-br');
  }

  public carregarEvento(): void {
    this.eventoId = +this.router.snapshot.paramMap.get('id');

    if (this.eventoId !== null || this.eventoId !== 0){
      this.spinner.show();
      this.eventoService.getEventoById(this.eventoId).subscribe(
        (evento: Evento) => {
          this.evento = {...evento};
          this.form.patchValue(this.evento);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar Evento.', 'Erro!');
          console.error(error);
        },
        () => this.spinner.hide(),
      );
    }
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', Validators.required],
    });
  }

  public resetForm(){
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarEvento (): void {
    this.spinner.show();

    if (this.form.valid) {

      this.evento = (this.eventoId === null || this.eventoId === 0) ? {...this.form.value } : { id: this.eventoId, ...this.form.value };
      const chamada = (this.eventoId === null || this.eventoId === 0) ? 'postEvento' : 'putEvento';

      this.eventoService[chamada](this.evento).subscribe(
        (result: any) => {
          this.toastr.success('O evento salvo com sucesso!', 'Sucesso');
        },
        (error: any) => {
          console.error(error);
          this.toastr.error('Erro ao tentar salvar o evento ', 'Error');
        }
      ).add(() => this.spinner.hide());
    }
  }

}
