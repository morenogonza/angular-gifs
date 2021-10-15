import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusquedaGifsRespones, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'YHafPih7pfWg8qkIbt8OfCJZ7dabRYKX';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  public resultado: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    this.resultado = JSON.parse(localStorage.getItem('resultado')!) || [];
  }

  insertarBusqueda(busqueda: string) {
    busqueda = busqueda.toLocaleLowerCase();

    if (busqueda.trim().length === 0) return;

    if (!this._historial.includes(busqueda)) {
      this._historial.unshift(busqueda);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', busqueda)
      .set('limit', '10');

    this.http
      .get<BusquedaGifsRespones>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        this.resultado = resp.data;
        localStorage.setItem('resultado', JSON.stringify(resp.data));
      });
  }
}
