import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  //Not null assertion operator (!)

  constructor(private gifsService: GifsService) {}

  ngOnInit(): void {}

  buscar() {
    const value = this.txtBuscar.nativeElement.value;
    if (value.trim().length === 0) {
      return;
    }
    this.txtBuscar.nativeElement.value = '';
    this.gifsService.buscarGifs(value);
  }
}
