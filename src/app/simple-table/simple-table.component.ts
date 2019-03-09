import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { GamesInfoService } from '../games-info.service';
import * as $ from 'node_modules/jquery/dist/jquery';
import { fromEvent, of } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
})
export class SimpleTableComponent implements OnInit, AfterViewInit {

  items: [];
  @Output() trClicked = new EventEmitter<string>();


  constructor(private gamesInfoService: GamesInfoService) { }

  ngOnInit() {
    this.items = this.gamesInfoService.getTheLatestLeagueTableRankings(4);
  }

  ngAfterViewInit() {
    this.subscribeTableRowClicked();
  }

  subscribeTableRowClicked(): void {
    fromEvent<{ "target": {} }>($("#simpleTable tr"), 'click')
      .pipe(throttleTime(1000))
      .subscribe(val => this.trClicked.emit($(val.target).closest("tr").children("td").eq(1).html()));
  }
}
