import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { Lote } from '@app/models/Lote';
import { LoteService } from '@app/services/lote.service';
import { DatePipe } from '@angular/common';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
  providers: [DatePipe],
})
export class EventoDetalheComponent implements OnInit {

  modalRef?: BsModalRef;
  eventoId =  0;
  evento = {} as Evento;
  form: FormGroup;
  loteAtual = {id: 0, nome: '', indice: 0};
  imagemURL = 'assets/img/semImagem.png';
  file: File;

  get modoEditar():boolean {
    return this.eventoId !== 0;
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }

  constructor(private fb: FormBuilder,
              private localeService: BsLocaleService,
              private activateRoute: ActivatedRoute,
              private eventoService: EventoService,
              private loteService: LoteService,
              private modalService: BsModalService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private router: Router,
              private datePipe: DatePipe)
  {
    this.localeService.use('pt-br');
  }

  public retornaDateUS(data: any): any {

    if (data === null || data === '')
      return data;

    var p = data.match(/(\d\d)\/(\d\d)\/(\d\d\d\d) (\d\d):(\d\d)/)
    var date = new Date(p[3]+'-'+p[2]+'-'+p[1]+'T'+p[4]+':'+p[5]+':00Z');

    return date;
  }

  public carregarEvento(): void {
    this.eventoId = +this.activateRoute.snapshot.paramMap.get('id');

    if (this.eventoId !== null && this.eventoId !== 0){
      this.spinner.show();
      this.eventoService.getEventoById(this.eventoId).subscribe(
        (evento: Evento) => {
          this.evento = {...evento};
          this.form.patchValue(this.evento);

          if (this.evento.imagemURL !== ''){
            this.imagemURL = environment.apiURL + 'resources/images/' + this.evento.imagemURL;
          }

          this.evento.lotes.forEach(lote => {

            lote.dataInicio = this.retornaDateUS(lote.dataInicio);
            lote.dataFim = this.retornaDateUS(lote.dataFim);

            this.lotes.push(this.criarLote(lote));
          });
          // this.carregarLote();
        },
        (error: any) => {
          this.toastr.error('Erro ao tentar carregar Evento.', 'Erro!');
          console.error(error);
        }
      ).add(() => this.spinner.hide());
    }
  }

  public carregarLotes(): void {
    if (this.eventoId !== null && this.eventoId !== 0){
      this.spinner.show();
      this.loteService.getLotesByEventoId(this.eventoId).subscribe(
        (lotesRetorno: Lote[]) => {
          lotesRetorno.forEach(lote => {

            lote.dataInicio = this.retornaDateUS(lote.dataInicio);
            lote.dataFim = this.retornaDateUS(lote.dataFim);

            this.lotes.push(this.criarLote(lote));
          });
        },
        (error: any) => {
          this.toastr.error('Erro ao tentar carregar Lotes.', 'Erro!');
          console.error(error);
        }
      ).add(() => this.spinner.hide());
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
      imagemURL: [''],
      lotes: this.fb.array([]),
    });
  }

  adicionarLote(): void {
    this.lotes.push(this.criarLote({id: 0} as Lote));
  }

  criarLote(lote: Lote): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim]
    });
  }

  public mudarValorData(value: Date, indice: number, campo: string): void {
    this.lotes.value[indice][campo] = value;
  }

  public retornaTituloLote(nome: string): string {
    return nome === null || nome === '' ? 'Nome do lote' : nome;
  }

  public resetForm(): void {
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
          this.router.navigate([`eventos/detalhe/${result.id}`]);
        },
        (error: any) => {
          console.error(error);
          this.toastr.error('Erro ao tentar salvar o evento ', 'Error');
        }
      ).add(() => this.spinner.hide());
    }
  }

  public salvarLotes(): void {
    this.spinner.show();

    if (this.form.controls.lotes.valid) {
      this.loteService.saveLote(this.eventoId, this.form.value.lotes).subscribe(
        (result: any) => {
          this.toastr.success('Lote salvo com sucesso!', 'Sucesso');
        },
        (error: any) => {
          console.error(error);
          this.toastr.error('Erro ao tentar salvar o lote', 'Error');
        }
      ).add(() => this.spinner.hide());
    }
  }

  public removerLote(template: TemplateRef<any>,
                     indice: number): void {

    this.loteAtual.id = this.lotes.get(indice + '.id').value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome').value;
    this.loteAtual.indice = indice;

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirmDeleteLote () {
    this.modalRef.hide();

    if (this.loteAtual.id !== 0) {

      this.spinner.show();

      this.loteService.deleteLote(this.eventoId, this.loteAtual.id).subscribe(
        (result: any) => {
          this.toastr.success('Lote deletado com sucesso!', 'Sucesso');
          this.lotes.removeAt(this.loteAtual.indice);
        },
        (error: any) => {
          console.error(error);
          this.toastr.error(`Erro ao tentar deletar o lote ${this.loteAtual.id}`, 'Error');
        }
      ).add(() => this.spinner.hide());
    }
    else
    {
      this.lotes.removeAt(this.loteAtual.indice);
    }
  }

  declineDeleteLote (): void {
    this.modalRef?.hide();
  }

  onFileChange(ev: any): void {
    const reader = new FileReader ();

    reader.onload = (event: any) => this.imagemURL = event.target.result;

    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);

    this.uploadImagem();
  }

  uploadImagem(): void {
    this.spinner.show();

    this.eventoService.postUpload(this.eventoId, this.file).subscribe(
      (result: any) => {
        this.carregarEvento();
        this.toastr.success('Imagem atualizada com sucesso!', 'Sucesso');
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(`Erro ao tentar atualizar a imagem`, 'Error');
      }
    ).add(() => this.spinner.hide());

  }
}


