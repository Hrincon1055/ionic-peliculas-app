/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { Pelicula, Genre, PeliculaDetalle } from '../interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public peliculas: any[] = [];
  public generos: Genre[] = [];
  public favoritoGenero: any[] = [];
  constructor(
    private dataLocalService: DataLocalService,
    private moviesService: MoviesService
  ) {}
  async ngOnInit() {}
  public async ionViewWillEnter() {
    this.peliculas = await this.dataLocalService.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();
    this.pelisPorGenero(this.generos, this.peliculas);
  }
  public pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {
    this.favoritoGenero = [];
    generos.forEach((genero) => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter((peli: any) => {
          return peli.genres.find((genre: any) => genre.id === genero.id);
        }),
      });
    });
  }
}
