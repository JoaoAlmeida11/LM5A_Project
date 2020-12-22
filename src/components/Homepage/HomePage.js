import ShowLeague from "./ShowLeague"
// import RequestLeague from "../../functions/Homepage/RequestLeague"

export default function HomePage(){
    const databaseLeague = [{
        id: 1,
        name: "La Liga",
        img: '/leagues/Laliga.png',
      },
      {
        id: 2,
        name: "Liga NOS",
        img: '../../images/leagues/Liga_NOS.png',
      }];
    return(
    <main className="container">
        <section className="row">
            {databaseLeague.map(league => <ShowLeague league={league} key={league.id}/>)}
        </section>
    </main>
    )
}