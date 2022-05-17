import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { Gif, SearchGIFResponse } from '../interfaces/gifsInterfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private API_KEY: string = '38Kc9GVuzCqJKGGvLsfN9ozYlFLhd2S0';
  private URL_BASE: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public data: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.data = JSON.parse(localStorage.getItem('data')!) || [];
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('limit', '10')
      .set('q', query);
    this.http
      .get<SearchGIFResponse>(`${this.URL_BASE}/search`, { params })
      .subscribe((res) => {
        this.data = res.data;
        localStorage.setItem('data', JSON.stringify(this.data));
      });
  }

  // async getGifs(busqueda: string) {
  //   const response = await fetch(
  //     `${this.URL_BASE}q=${busqueda}&api_key=${this.API_KEY}&limit=10`
  //   );
  //   const json = await response.json();
  //   return json.data;
  // }
}
