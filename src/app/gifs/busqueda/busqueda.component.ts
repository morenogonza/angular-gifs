import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent {
  @ViewChild('txtBusqueda') txtBusqueda!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  busqueda() {
    const valor = this.txtBusqueda.nativeElement.value;

    this.gifsService.insertarBusqueda(valor);

    this.txtBusqueda.nativeElement.value = '';
  }
}
