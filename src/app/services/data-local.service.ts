/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces';
@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  public _storage: Storage | null = null;
  public peliculas: PeliculaDetalle[] = [];
  constructor(private storage: Storage, private toasCtrl: ToastController) {
    this.init();
    this.cargarFavoritos();
  }
  public async init(): Promise<void> {
    const storage = await this.storage.create();
    this._storage = storage;
  }
  public async presentToast(message: string): Promise<void> {
    const toast = await this.toasCtrl.create({
      message,
      duration: 1500,
    });
    toast.present();
  }
  public async guardarPelicula(pelicula: PeliculaDetalle): Promise<boolean> {
    let existe = false;
    let mensaje = '';
    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }
    if (existe) {
      this.peliculas = this.peliculas.filter((peli) => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a fovoritos';
    }
    this.presentToast(mensaje);
    this._storage.set('peliculas', this.peliculas);
    return !existe;
  }
  public async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }
  public async existePelicula(id: any) {
    id = Number(id);
    await this.cargarFavoritos();
    const existe = this.peliculas.find((peli) => peli.id === id);
    return existe ? true : false;
  }
}
