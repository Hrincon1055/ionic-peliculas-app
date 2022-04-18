/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RespuestaMDB,
  PeliculaDetalle,
  RespuestaCredits,
  Genre,
} from '../interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  public generos?: Genre[] = [];
  private popularesPage?: number = 0;
  constructor(private http: HttpClient) {}

  public getFeature(): Observable<RespuestaMDB> {
    const hoy = new Date();
    const ultimoDia = new Date(
      hoy.getFullYear(),
      hoy.getMonth() + 1,
      0
    ).getDate();
    const mes = hoy.getMonth();
    let mesString: string;
    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes.toString();
    }
    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;
    return this.ejecutarQuery<RespuestaMDB>(
      `/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`
    );
  }
  public getPopulares(): Observable<RespuestaMDB> {
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }
  public getPeliculaDetalle(id: string): Observable<PeliculaDetalle> {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }
  public getActoresPelicula(id: string): Observable<RespuestaCredits> {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }
  public buscarPeliculas(texto: string): Observable<RespuestaMDB> {
    return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${texto}`);
  }
  public cargarGeneros(): Promise<Genre[]> {
    return new Promise((resolve) => {
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe((response: any) => {
        this.generos = response.genres;
        resolve(this.generos);
      });
    });
  }
  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es`;
    return this.http.get<T>(query);
  }
}
