import ShowLeague from "./ShowLeague"
import RequestLeague from "../../functions/Homepage/RequestLeague"

export default function HomePage(){
    const databaseLeague = RequestLeague();
    
    return(
    <main className="container">
        {databaseLeague && databaseLeague.map((league) => {
         return (<ShowLeague league={league.name} key={league.id}/>)
        }) }
    </main>
    )
}