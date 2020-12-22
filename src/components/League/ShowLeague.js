

export default function ShowLeague(props){
    return(
        <article className="col-12 col-md-6 col-lg-4">
            <figure>
                <img src={props.image} />
            </figure>
            <p className="text-center">{props.name}</p>
            <button onClick={}></button>
        </article>
    )
}