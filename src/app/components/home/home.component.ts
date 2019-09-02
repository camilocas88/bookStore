import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public books = []
  public book = ''
  public dollar:number = 3454.90

  constructor(private _dataApi: DataApiService) { }

  ngOnInit() {
    this._dataApi.getAllBooks().subscribe(books =>{
      console.log('books= ', books);
      this.books = books
    })
  }

}
