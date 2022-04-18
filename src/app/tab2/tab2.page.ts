import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public textoBuscar?: string = '';
  public ideas: string[] = [
    'Spiderman',
    'Superman',
    'Un Lugar en silencio',
    'La vida es bella',
  ];
  public peliculas: Pelicula[] = [];
  public buscando?: boolean = false;
  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) {}
  ngOnInit(): void {}
  public buscar(event: Event) {
    const valor = (event as CustomEvent).detail.value;
    if (valor === '') {
      this.buscando = false;
      this.peliculas = [];
      return;
    }
    this.buscando = true;
    this.moviesService.buscarPeliculas(valor).subscribe((response) => {
      this.peliculas = response.results;
      this.buscando = false;
    });
  }
  public async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id,
      },
    });
    await modal.present();
  }
}
