import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Utente } from '../classes/models/utente';
import { HttpSenderService } from './http-sender-service';
import { map, catchError } from 'rxjs/operators';
import { SERVICE_TYPE } from '../classes/utils/costanti';
import { Rosa } from '../classes/models/rosa';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends HttpSenderService {

  utenti: Utente[];

  constructor(private http: HttpClient, private route: Router) {
    super(SERVICE_TYPE.ADMIN);
  }

  getUtenti(): Observable<Utente[]> {
    return this.http.get(`${this.buildURL("get_all_utenti")}`).pipe(
      map((res) => {
        this.utenti = res['data'];

        return res['data'];
      }),
      catchError(this.handleError));
  }


  validateUtente(utente: Utente) {
    return this.http.put(`${this.buildURL("set_validate_utente")}`, { data: utente })
      .pipe(map((res) => {
        return 'ok';
      }),
        catchError(this.handleError));
  }

  pagato(utente: Utente) {
    return this.http.put(`${this.buildURL("set_pay_utente")}`, { data: utente })
      .pipe(map((res) => {
        return 'ok';
      }),
        catchError(this.handleError));
  }

  deleteUtente(id_utente: string) {
    const params = new HttpParams().set('id_utente', id_utente);

    return this.http.get(`${this.buildURL("del_utente")}`, { params: params })
      .pipe(map(res => {
        return 'ok';
      }),
        catchError(this.handleError));
  }

  deleteRosa(id_utente: string) {
    const params = new HttpParams().set('id_utente', id_utente);

    return this.http.get(`${this.buildURL("del_rosa_utente")}`, { params: params })
      .pipe(map(res => {
        return 'ok';
      }),
        catchError(this.handleError));
  }

  getListaCalciatori() {
    return this.http.get(`${this.buildURL("get_lista_calciatori")}`).pipe(
      map((res) => {

        return res['data'];

      }),
      catchError(this.handleError));
  }

  getGiornateCalcolate() {
    return this.http.get(`${this.buildURL("get_giornate_calcolate")}`).pipe(
      map((res) => {

        return res['data'];

      }),
      catchError(this.handleError));
  }

  
  calcolaGiornata(payload: any): Observable<any[]> {

    return this.http.post(`${this.buildURL("set_calcolo_giornata")}`, { data: payload })
      .pipe(map((res) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }

  insertSvincolati(rose: Rosa[]) {

    return this.http.post(`${this.buildURL("set_svincolati")}`, { data: rose })
      .pipe(map((res) => {
        return 'ok';
      }),
        catchError(this.handleError));
  }

  updateRosaUtente(lista: any) { //associa la rosa all'utente

    return this.http.post(`${this.buildURL("upd_rosa_utente")}`, { data: lista })
      .pipe(map((res) => {
        return 'ok';
      }),
        catchError(this.handleError));
  }

  insertVoti(risultati: any): Observable<any[]> {

    let payloads=this.formatting.payloadCalcolo(risultati);

    return this.http.post(`${this.buildURL("set_voti")}`, { data: payloads.voti })
      .pipe(map((res) => {
        return payloads.ris;
      }),
        catchError(this.handleError));
  }

  getFormazioni(giornata: string) {

    const params = new HttpParams().set('giornata', giornata);

    return this.http.get<any>(`${this.buildURL("get_formazioni")}`,{ params: params })
      .pipe(map((res) => {

        return this.formatting.schieramenti(res['data']);

      }),
        catchError(this.handleError));
  }

  getSchiermenti(giornata: string) {

    const params = new HttpParams().set('giornata', giornata);

    return this.http.get<any>(`${this.buildURL("get_formazioni")}`,{ params: params })
      .pipe(map((res) => {
        
        let schieramento=this.formatting.schieramenti(res['data']);
        let ordinata=this.formatting.formazioniPerGara(schieramento);
        return ordinata;

      }),
        catchError(this.handleError));
  }

  getPalinsesto(input: any, filelist: any) {

        return this.formatting.palinsesto(input,filelist)

  }

  recuperoFormazione(payload: any): Observable<any[]> {

    return this.http.post(`${this.buildURL("upd_schieramento")}`,{ data: payload })
      .pipe(map((res) => {

        return res['data'];
      }),
        catchError(this.handleError));
  }

  setComunicazione(payload: any): Observable<any[]> {

    return this.http.post(`${this.buildURL("set_comunicazione")}`, { data: payload })
      .pipe(map((res) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }

  getComunicazioni(): Observable<any[]> {
    return this.http.get(`${this.buildURL("get_all_comunicazioni")}`).pipe(
      map((res) => {
        return res['data'];
      }),
      catchError(this.handleError));
  }

  addComunicazione(payload: any): Observable<any[]> {

    return this.http.post(`${this.buildURL("add_comunicazione")}`, { data: payload })
      .pipe(map((res) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }

  lastFormazioniInserite(): Observable<any[]> {
    return this.http.get(`${this.buildURL("last_formazioni_inserite")}`).pipe(
      map((res) => {
        return res['data'];
      }),
      catchError(this.handleError));
  }

  getCreaCompetizioneRandom() {
    return this.http.get(`${this.buildURL("get_crea_competizione_random")}`).pipe(
      map((res) => {

        return res['data'];

      }),
      catchError(this.handleError));
  }

  setCreaCompetizioneRandom(payload: any): Observable<any[]> {

    return this.http.post(`${this.buildURL("set_crea_competizione_random")}`, { data: payload })
      .pipe(map((res) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }

  sostituisciCalciatore(payload: any) { 

    return this.http.post(`${this.buildURL("upd_player_utente")}`, { data: payload })
      .pipe(map((res) => {
        return 'ok';
      }),
        catchError(this.handleError));
  }
}

