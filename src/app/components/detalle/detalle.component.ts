import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id: string;
  public pelicula: PeliculaDetalle = {};
  public actores: Cast[] = [];
  public oculto?: number = 150;
  public slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5,
  };
  public estrella?: string = 'star-outline';
  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocalService: DataLocalService
  ) {}

  ngOnInit() {
    this.dataLocalService.existePelicula(this.id).then((existe) => {
      this.estrella = existe ? 'star' : 'star-outline';
    });
    this.moviesService.getPeliculaDetalle(this.id).subscribe((response) => {
      this.pelicula = response;
    });
    this.moviesService.getActoresPelicula(this.id).subscribe((response) => {
      this.actores = response.cast;
    });
  }
  public regresar() {
    this.modalCtrl.dismiss();
  }
  public favorito() {
    this.dataLocalService.guardarPelicula(this.pelicula).then((existe) => {
      this.estrella = existe ? 'star' : 'star-outline';
    });
  }
}
