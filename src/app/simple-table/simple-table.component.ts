import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GamesInfoService } from '../games-info.service';
import * as $ from 'node_modules/jquery/dist/jquery';
import { fromEvent,of } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
})
export class SimpleTableComponent implements OnInit {

  items: [];
  @Output() trClicked = new EventEmitter<string>();


  constructor(private gamesInfoService: GamesInfoService) { }

  ngOnInit() {
    this.items = this.gamesInfoService.getTheLatestLeagueTableRankings();
    this.subscribeTableRowClicked();
  }

  subscribeTableRowClicked(): void {
    alert($("#simpleTable tbody").html());
    // fromEvent($("#simpleTable tr"), 'click')
    //   .pipe(
    //     map(event => 1))
    //   .subscribe(val => alert(val));
  }
}
