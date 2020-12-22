import ShowLeague from "./ShowLeague"
import RequestLeague from "../../functions/Homepage/RequestLeague"

export default function HomePage(){
    const databaseLeague = RequestLeague();
    return(
    <main className="container">
        <section className="row">
            {databaseLeague.map((league) => {
                 return (<ShowLeague league={league} key={league.id}/>)
            }) }
        </section>
    </main>
    )
}