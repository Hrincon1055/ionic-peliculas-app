import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula } from '../../interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {
  @Input() peliculas: Pelicula[];
  @Output() cargarMas = new EventEmitter();
  public slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10,
  };
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  public onClick() {
    this.cargarMas.emit();
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
