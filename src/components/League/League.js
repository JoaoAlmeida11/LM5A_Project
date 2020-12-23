import {  useParams } from "react-router-dom";

import ClubeDaLiga from './ClubeDaLiga';

class databaseClubs{
    constructor(){
        this.data = [{
            id: 1,
            name: "La Liga",
            img: '',
            clubs:[
                "Valencia",
                "Villarreal",
                "Barcelona",
                "Celta Vigo",
                "Elche",
                "Granada",
                "Levante"
            ]
          },
          {
            id: 2,
            name: "Liga NOS",
            img: '',
            clubs:[
                "Porto",
                "Marítimo",
                "Farense",
                "Braga",
                "Rio Ave",
                "Tondela"
            ]
          }];
    }
    *[Symbol.iterator](){
        yield this.data;
    }
}


export default function League(){
    let { paramsId } = useParams();

    const dbClubs = new databaseClubs();
    console.log(paramsId);

    const selectClub = dbClubs.data.filter(club => club.id === paramsId);

    // console.log(selectClub);
    // const selectClub = dbClubs.filter(club => club.id === paramsId);
    // console.log(selectClub);

    return(
    <main className='container'>  
        <section className="row">
            {databaseClubs.map(league => <ClubeDaLiga league={league} key={league.id} path={paramsId}/>)}
        </section>
    </main>)
}
