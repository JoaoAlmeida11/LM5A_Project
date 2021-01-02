import { Link } from 'react-router-dom'; //change to connect-router
import { Col, Button } from 'react-bootstrap';
// import { Image } from 'react-bootstrap';

export default function ClubeDaLiga({ club }) {
	return (
		<Col xs={12} md={6} lg={4}>
			{/* <Image src={`${club.img}`} alt={altImage} fluid/> */}
			<h3 className="text-center">{club.name}</h3>
			<Button className="homepageButtonLeague">
				<Link to={`/lm5a_project/club/${club.id}`} className="text-white">
					View more!
				</Link>
			</Button>
		</Col>
	);
}
