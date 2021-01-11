import { Link } from 'react-router-dom';
import { Col, Button, Image } from 'react-bootstrap';
// import { Col, Button, Image } from 'react-bootstrap';

// o scr da imagem n funciona pq n sei onde ele começa... verificar como é que se comporta com uma API
export default function ShowLeague({ league }) {
	console.log(league);
	const altImage = 'League of ' + league.name;
	return (
		<Col xs={12} md={6} lg={4}>
			<Image src={`${league.logo}`} alt={altImage} fluid />
			<h3 className="text-center">{league.name}</h3>
			<Button className="homepageButtonLeague">
				<Link to={`/lm5a_project/league/${league.id}`} className="text-white">
					View more!
				</Link>
			</Button>
		</Col>
	);
}
