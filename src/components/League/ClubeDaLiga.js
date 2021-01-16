import { Link } from 'react-router-dom'; //change to connect-router
import { Col, Button, Image } from 'react-bootstrap';

export default function ClubeDaLiga({ club }) {
	return (
		<Col xs={12} md={6} lg={4}>
			<Image src={`${club.logo}`} alt={club.teamName} fluid />

			<h3 className="text-center">{club.teamName}</h3>
			<Button className="homepageButtonLeague">
				<Link
					to={`/lm5a_project/club/${club.seasonID}/${club.teamID}`}
					className="text-white"
				>
					View more!
				</Link>
			</Button>
		</Col>
	);
}
