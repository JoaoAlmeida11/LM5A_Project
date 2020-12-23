import { Link } from "react-router-dom";

// o scr da imagem n funciona pq n sei onde ele começa... verificar como é que se comporta com uma API
export default function ShowLeague(props) {
    // const altImage='League of '+props.league.name;
//    const imgSrc =
    return(
        <article className="col-12 col-md-6 col-lg-4 text-center">
            {/* <img src={`${props.league.img}`} alt={altImage} className='img-fluid'/> */}
            <h3 className="text-center">{props.league.name}</h3>
            <button className="homepageButtonLeague">
                <Link to={`/lm5a_project/league/${props.league.id}`} className='text-white'>View more!</Link>
            </button>
        </article>
    )
}