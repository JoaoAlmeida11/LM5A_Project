import { Link } from "react-router-dom";
export default function ClubeDaLiga(props){
    return(
        <article className="col-12 col-md-6 col-lg-4 text-center">
        {/* <img src={`${props.club.img}`} alt={altImage} className='img-fluid'/> */}
        <h3 className="text-center">{props.club.name}</h3>
        <button className="homepageButtonLeague">
                <Link to={`/lm5a_project/club/${props.club.id}`} className='text-white'>View more!</Link>
            </button>
    </article>
        )
}