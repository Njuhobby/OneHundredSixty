import {RoadMap} from "./road-map.model"

export class Game {
    
    constructor(public date:Date, public index:number, public winPlayerOne:string, public winPlayerTwo:string, public losePlayerOne:string, public losePlayerTwo:string, 
        public duration:number, public winRoadMap:RoadMap, public loseRoadMap:RoadMap, public mvp:string, public mvpReason:string,
        public psm:string, public psmReason:string){ 
    }
}
