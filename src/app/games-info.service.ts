import { Injectable } from '@angular/core';
import { Game } from "./model/game.model";
import { Observable, of } from 'rxjs';
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
          "items": ["5","8", "10", "K", "A"]
        },
        {
          "items": ["5"]
        }, null,null,null,null),

      new Game(new Date("01/18/2019"), 1, "Hobby", "Yawei", "Ps", "Leon", 2,
        {
          "items": ["5","8","10","K","A"]
        },
        {
          "items": ["5"]
        },null,null,null,null),

      new Game(new Date("01/18/2019"), 2, "Leon", "Ps", "Yawei", "Hobby", 4,
        {
          "items": ["5", "8", "10", "K", "A"]
        },
        {
          "items": ["5","8"]
        },null,null,null,null),

      new Game(new Date("01/19/2019"), 0, "Yawei", "Ps", "Hobby", "Leon", 5,
        {
          "items": ["5", "8", "10", "K", "A"]
        },
        {
          "items": ["5", "8", "10"]
        },null,null,null,null),

      new Game(new Date("01/26/2019"), 0, "Yawei", "Ps", "Hobby", "WangChen", 2,
        {
          "items": ["5", "10", "8", "10", "8", "10", "10", "K", "A"]
        },
        {
          "items": ["5", "8", "10"]
        },null,null,null,null),

      new Game(new Date("01/26/2019"), 1, "Yawei", "Ps", "Hobby", "WangChen", 3,
        {
          "items": ["5","8","10","J","K","A"]
        },
        {
          "items": ["5","8","10"]
        },null,null,null,null),

      new Game(new Date("02/14/2019"), 0, "Yawei", "Ps", "Hobby", "Leon", 4, 
      {
        "items": ["5", "8", "10", "J", "Q", "A"]
      }, 
      {
        "items": ["5", "10", "J", "K", "J", "K"]
      }, null, null, null, null),

      new Game(new Date("02/14/2019"), 0, "Yawei", "Ps", "Hobby", "Leon", 4, 
      {
        "items": ["5", "8", "10", "J", "Q", "A"]
      }, 
      {
        "items": ["5", "10", "J", "K", "J", "K"]
      }, null, null, null, null),

      new Game(new Date("02/15/2019"), 0, "Yawei", "Ps", "Hobby", "Leon", 6,
        {
          "items": ["5", "10", "K", "K", "K", "A"]
        },
        {
          "items": ["5", "10", "k", "A"]
        },null,null,null,null), 
      
      new Game(new Date("02/15/2019"), 1, "Yawei", "Ps", "Hobby", "Leon", 2, 
      {
        "items": ["5","6","8","10","J","K","A"]
      }, 
      {
        "items":["5","8","10","Q"]
      },null,null,null,null), 

      new Game(new Date("02/15/2019"), 2, "Hobby", "Yawei", "Ps", "Leon", 3, 
      {
        "items":['5','7','9','10','K','A']
      }, 
      {
        "items":['5','9','10','K']
      }, null,null, 'Leon', '当日最颓，无一胜绩，一胜八负，永为谈资，拉我下水，荼毒队友')
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

  private increaseProperyCreateIfNotExists(instance:any, propertyName:string):void{
    if(instance[propertyName] === undefined){
      instance[propertyName] = 1;
    }
    else{
      instance[propertyName]++;
    }
  }

  cardsPlayedMost():string {
    let cardsPlayedTime = {};
    this.games.forEach(element => {
      element.winRoadMap.items.forEach(item => {
        this.increaseProperyCreateIfNotExists(cardsPlayedTime, item);
      });
      element.loseRoadMap.items.forEach(item => {
        this.increaseProperyCreateIfNotExists(cardsPlayedTime, item);
      });
    });

    let cardPlayedMostTimes:string = null;
    let maxTimes:number = 0;
    for(let key of Object.keys(cardsPlayedTime)){
      if(key == "5"){
        continue;
      }
      if(cardsPlayedTime[key] > maxTimes){
        maxTimes = cardsPlayedTime[key];
        cardPlayedMostTimes = key;
      }
    } 
    return cardPlayedMostTimes;
  }

  private getDistinctDates(): Date[] {
    let datesSet = [];
    this.games.forEach(element => {
      if(datesSet.length === 0 || datesSet[datesSet.length-1].getTime() != element.date.getTime()){
        datesSet.push(element.date);
      }
    });
    return datesSet.sort((a, b) => { return Math.abs(a.getTime() - b.getTime()); })
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

  getPlayerWinRateUntilDate(player: string, date: Date): number{
    if(this.cachedLeagueTables[date.toString()]){
      return this.cachedLeagueTables[date.toString()].meta[player].winRate;
    }
    
    this.leagueTableUntilDate(date);
    return this.cachedLeagueTables[date.toString()].meta[player].winRate;
  }

  leagueTableUntilDate(date: Date): any {
    let leagueTable: any = {};
    let leagueTableMeta: any = {};
    let ranking: any[] = [];

    this.players.forEach(element => {
      leagueTableMeta[element] = {};
      leagueTableMeta[element]["winNumber"] = 0;
      leagueTableMeta[element]["loseNumber"] = 0;
      leagueTableMeta[element]["points"] = 0;
      leagueTableMeta[element]["winRate"] = 0;
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
      leagueTableMeta[element]["points"] = leagueTableMeta[element]["winNumber"] * 3;
      let winNumber = leagueTableMeta[element].winNumber;
      let loseNumber = leagueTableMeta[element].loseNumber;
      let totalNumber = winNumber + loseNumber;
      if(totalNumber === 0){
        leagueTableMeta[element]["winRate"] = 0;
      }
      else{
        leagueTableMeta[element]["winRate"] = winNumber/totalNumber;
      }
      ranking.push({ "player": element, "points": leagueTableMeta[element]["points"], "winRate":leagueTableMeta[element]["winRate"] });
    });

    leagueTable["meta"] = leagueTableMeta;
    leagueTable["ranking"] = ranking.sort((a, b) => { return b["points"] - a["points"] });
    this.cachedLeagueTables[date.toString()] = leagueTable;
    return leagueTable;
  }

  getPlayerRankingTrendForThePreviousGames(player: string): Observable<number[]> {
    let numberOfDistinctDates: number = this.distinctDates.length;
    let numberOfDatesToCount: number = 7;
    if (numberOfDistinctDates < numberOfDatesToCount) {
      numberOfDatesToCount = numberOfDistinctDates;
    }
    let result: number[] = [];
    for (let i = numberOfDistinctDates - numberOfDatesToCount; i < numberOfDistinctDates; i++) {
      let dateToCount: Date = this.distinctDates[i];
      let playerRanking = this.getPlayerRankingUntilDate(player, dateToCount);
      result.push(playerRanking);
    }
    return of(result);
  }

  getPlayerWinRateTrendForThePreviousGames(player:string):Observable<number[]>{
    let numberOfDistinctDates: number = this.distinctDates.length;
    let numberOfDatesToCount: number = 7;
    if(numberOfDistinctDates < numberOfDatesToCount){
      numberOfDatesToCount = numberOfDistinctDates;
    }
    let result:number[] = [];
    for(let i = numberOfDistinctDates - numberOfDatesToCount; i < numberOfDistinctDates; i++){
      let dateToCount:Date = this.distinctDates[i];
      let playerWinRate = this.getPlayerWinRateUntilDate(player, dateToCount);
      result.push(playerWinRate);
    }
    return of(result.map(i => {i = i*100; return parseFloat(i.toFixed(2));}));
  }

  getTheLatestLeagueTableRankings():[]{
    let latestDate = this.distinctDates[this.distinctDates.length-1];
    if(this.cachedLeagueTables[latestDate.toString()]){
      return this.cachedLeagueTables[latestDate.toString()].ranking.slice(0,4).map(i => {
        return {"player": i.player, "points":i.points, "winRate":(i.winRate * 100).toFixed(2)};
      });
    }
    else{
      this.leagueTableUntilDate(latestDate);
      return this.cachedLeagueTables[latestDate.toString()].ranking.slice(0,4).map(i => {
        return {"player": i.player, "points":i.points, "winRate":(i.winRate * 100).toFixed(2)};
      });
    }
  }
}
