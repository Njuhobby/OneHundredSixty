import { Component, OnInit } from '@angular/core';
import { GamesInfoService } from '../games-info.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  items:[];
  constructor(private gamesInfoService:GamesInfoService) { }

  ngOnInit() {
    this.items = this.gamesInfoService.getTheLatestLeagueTableRankings(8);
  }

}
