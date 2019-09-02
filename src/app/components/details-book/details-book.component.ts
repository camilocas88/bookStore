import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../app/services/data-api.service';
import { BookInterface } from "../../models/book";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.scss']
})
export class DetailsBookComponent implements OnInit {
  public book: BookInterface = {}

  constructor(
    private _dataApi: DataApiService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    const idBook = this.route.snapshot.params['id']
    this.getDetails(idBook)
  }
  
  getDetails(idBook:string): void{
    this._dataApi.getOneBook(idBook).subscribe( book => {
    this.book = book      
    })    
  }
}
