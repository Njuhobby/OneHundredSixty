import { Component, OnInit } from '@angular/core';
import { GamesInfoService } from '../games-info.service';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
})
export class SimpleTableComponent implements OnInit {

  items:[];

  constructor(private gamesInfoService:GamesInfoService) { }

  ngOnInit() {
    this.items = this.gamesInfoService.getTheLatestLeagueTableRankings();
  }

}
