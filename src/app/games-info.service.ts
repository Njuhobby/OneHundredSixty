import { Injectable } from '@angular/core';
import { Game } from "./model/game.model";
import { RoadMapItem } from './model/road-map-item.model';
import { Observable, of } from 'rxjs';
import { RoadMap } from './model/road-map.model';
import { element } from '@angular/core/src/render3';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GamesInfoService {
  games: Game[];
  players: string[];
  cachedLeagueTables: any[];
  distinctDates: Date[];

  constructor() {
    this.cachedLeagueTables = [];
    this.players = ["Hobby", "Yawei", "Ps", "Leon", "WangChen", "GaoZha", "Gin", "Seven", "KoDB"];
    this.games = [
      new Game(new Date("01/18/2019"), 0, "Hobby", "Yawei", "Ps", "Leon", 2,
        {
          "items": [
            new RoadMapItem("5", "Hobby", "", 20),
            new RoadMapItem("8", "", "", 20),
            new RoadMapItem("10", "", "", 30),
            new RoadMapItem("K", "", "", 30),
            new RoadMapItem("A", "", "", 100)
          ]
        },
        {
          "items": [
            new RoadMapItem("5", "", "", 30)
          ]
        }),

      new Game(new Date("01/18/2019"), 1, "Hobby", "Yawei", "Ps", "Leon", 2,
        {
          "items": [
            new RoadMapItem("5", "", "", 20),
            new RoadMapItem("8", "", "", 20),
            new RoadMapItem("10", "", "", 30),
            new RoadMapItem("K", "", "", 30),
            new RoadMapItem("A", "", "", 100)
          ]
        },
        {
          "items": [
            new RoadMapItem("5", "", "", 30)
          ]
        }),

      new Game(new Date("01/18/2019"), 2, "Leon", "Ps", "Yawei", "Hobby", 4,
        {
          "items": [
            new RoadMapItem("5", "", "", 20),
            new RoadMapItem("8", "", "", 20),
            new RoadMapItem("10", "", "", 30),
            new RoadMapItem("K", "", "", 30),
            new RoadMapItem("A", "", "", 100)
          ]
        },
        {
          "items": [
            new RoadMapItem("5", "", "", 80),
            new RoadMapItem("8", "", "", 190),
          ]
        }),

      new Game(new Date("01/19/2019"), 0, "Yawei", "Ps", "Hobby", "Leon", 5,
        {
          "items": [
            new RoadMapItem("5", "", "", 150),
            new RoadMapItem("8", "", "", 120),
            new RoadMapItem("10", "", "", 130),
            new RoadMapItem("J", "", "", 180),
            new RoadMapItem("K", "", "", 30),
            new RoadMapItem("A", "", "", 100)
          ]
        },
        {
          "items": [
            new RoadMapItem("5", "", "", 80),
            new RoadMapItem("8", "", "", 110),
            new RoadMapItem("10", "", "", 100)
          ]
        }),

      new Game(new Date("01/26/2019"), 0, "Yawei", "Ps", "Hobby", "WangChen", 2,
        {
          "items": [
            new RoadMapItem("5", "", "", 150),
            new RoadMapItem("8", "", "", 120),
            new RoadMapItem("10", "", "", 130),
            new RoadMapItem("J", "", "", 180),
            new RoadMapItem("K", "", "", 30),
            new RoadMapItem("A", "", "", 100)
          ]
        },
        {
          "items": [
            new RoadMapItem("5", "", "", 80),
            new RoadMapItem("8", "", "", 110),
            new RoadMapItem("10", "", "", 100)
          ]
        }),

      new Game(new Date("01/26/2019"), 1, "Yawei", "Ps", "Hobby", "WangChen", 3,
        {
          "items": [
            new RoadMapItem("5", "", "", 150),
            new RoadMapItem("8", "", "", 120),
            new RoadMapItem("10", "", "", 130),
            new RoadMapItem("J", "", "", 180),
            new RoadMapItem("K", "", "", 30),
            new RoadMapItem("A", "", "", 100)
          ]
        },
        {
          "items": [
            new RoadMapItem("5", "", "", 80),
            new RoadMapItem("8", "", "", 110),
            new RoadMapItem("10", "", "", 100)
          ]
        }),

      new Game(new Date("02/15/2019"), 0, "Yawei", "Ps", "Hobby", "Leon", 6,
        {
          "items": [
            new RoadMapItem("5", "", "", 140),
            new RoadMapItem("10", "", "", 200),
            new RoadMapItem("K", "", "", 180),
            new RoadMapItem("k", "", "", 170), 
            new RoadMapItem("A", "", "", 10)
          ]
        },
        {
          "items": [
            new RoadMapItem("5", "Hobby", "", 40), 
            new RoadMapItem("10", "", "", 140), 
            new RoadMapItem("K", "Hobby", "", 200), 
            new RoadMapItem("K", "", "", 190),
            new RoadMapItem("A", "", "", 165)
          ]
        })
    ];
    this.distinctDates = this.getDistinctDates();
  }

  avgDurationPerGame(): number {
    let totalDuration: number = 0;
    let numberOfGames = this.games.length;
    this.games.forEach(element => {
      totalDuration += element.duration;
    });
    return totalDuration / numberOfGames;
  }

  numberOfGamesLastThirtyDays(): number {
    let result = 0;
    this.games.forEach(element => {
      let gameDate = element.date;
      let today = new Date();
      let timeDiff = Math.abs(today.getTime() - gameDate.getTime());
      let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (diffDays <= 30) {
        result += 1;
      }
    });
    return result;
  }

  avgPointsPerGame(): number {
    let totalPoints = 0;
    this.games.forEach(element => {
      let gameTotalPoints = element.winRoadMap.items.reduce((a, b) => a + b.pointsCollected, 0) + element.loseRoadMap.items.reduce((a, b) => a + b.pointsCollected, 0);
      totalPoints += gameTotalPoints;
    });
    return totalPoints / this.games.length;
  }

  private getDistinctDates(): Date[] {
    let datesSet = new Set<Date>();
    this.games.forEach(element => {
      datesSet.add(element.date);
    });
    return Array.from(datesSet).sort((a, b) => { return Math.abs(a.getTime() - b.getTime()); })
  }

  private findPlayerRankingInLeagueTable(leagueTable: any, player: string): number {
    let ranking = leagueTable["ranking"];
    for (let i: number = 0; i < ranking.length; i++) {
      if (ranking[i]["player"] == player) {
        return i + 1;
      }
    }
    return -1;
  }

  getPlayerRankingUntilDate(player: string, date: Date): number {
    if (this.cachedLeagueTables[date.toString()]) {
      return this.findPlayerRankingInLeagueTable(this.cachedLeagueTables[date.toString()], player);
    }

    let leagueTable = this.leagueTableUntilDate(date);
    return this.findPlayerRankingInLeagueTable(leagueTable, player);
  }

  leagueTableUntilDate(date: Date): any {
    let leagueTable: any;
    let leagueTableMeta: any;
    let ranking: any[];

    this.players.forEach(element => {
      leagueTableMeta[element]["winNumber"] = 0;
      leagueTableMeta[element]["loseNumber"] = 0;
      leagueTableMeta[element]["points"] = 0;
    });

    this.games.forEach(element => {
      if (element.date > date) {
        return;
      }
      leagueTableMeta[element.winPlayerOne]["winNumber"] += 1;
      leagueTableMeta[element.winPlayerTwo]["winNumber"] += 1;
      leagueTableMeta[element.losePlayerOne]["loseNumber"] += 1;
      leagueTableMeta[element.losePlayerTwo]["loseNumber"] += 1;
    });

    this.players.forEach(element => {
      leagueTableMeta[element]["points"] = leagueTableMeta["winNumber"] * 3;
      ranking.push({ "player": element, "points": leagueTableMeta[element]["points"] });
    });

    leagueTable["meta"] = leagueTableMeta;
    leagueTable["ranking"] = ranking.sort((a, b) => { return a["points"] - b["points"] });
    this.cachedLeagueTables[date.toString()] = leagueTable;
    return leagueTable;
  }

  getPlayerRankingTrendForThePreviousGames(player: string): Observable<number[]> {
    let numberOfDistinctDates: number = this.distinctDates.length;
    let numberOfDatesToCount: number = 7;
    if (numberOfDistinctDates < 7) {
      numberOfDatesToCount = numberOfDistinctDates;
    }
    let result: number[];
    for (let i = numberOfDistinctDates - numberOfDatesToCount; i < numberOfDistinctDates; i++) {
      let dateToCount: Date = this.distinctDates[i];
      let playerRanking = this.getPlayerRankingUntilDate(player, dateToCount);
      result.push(playerRanking);
    }
    return of(result);
  }
}
