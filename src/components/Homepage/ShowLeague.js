import { Link } from 'react-router-dom';
import { Col, Button } from 'react-bootstrap';
// import { Col, Button, Image } from 'react-bootstrap';

// o scr da imagem n funciona pq n sei onde ele começa... verificar como é que se comporta com uma API
export default function ShowLeague(props) {
	// const altImage='League of '+props.league.name;
	//    const imgSrc =
	return (
		<Col xs={12} md={6} lg={4}>
			{/* <Image src={`${props.league.img}`} alt={altImage} fluid */}
			<h3 className="text-center">{props.league.name}</h3>
			<Button className="homepageButtonLeague">
				<Link
					to={`/lm5a_project/league/${props.league.id}`}
					className="text-white"
				>
					View more!
				</Link>
			</Button>
		</Col>
	);
}
