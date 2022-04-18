import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public peliculasRecientes: Pelicula[] = [];
  public populares: Pelicula[] = [];

  constructor(private moviesService: MoviesService) {}
  ngOnInit(): void {
    this.moviesService.getFeature().subscribe((response) => {
      this.peliculasRecientes = response.results;
    });
    this.getPopulares();
  }
  public cargarMas() {
    this.getPopulares();
  }
  public getPopulares() {
    this.moviesService.getPopulares().subscribe((response) => {
      const arrTemp = [...this.populares, ...response.results];
      this.populares = arrTemp;
    });
  }
}
