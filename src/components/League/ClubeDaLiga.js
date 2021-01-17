import { Link } from 'react-router-dom'; //change to connect-router
import { Col, Button, Image } from 'react-bootstrap';

export default function ClubeDaLiga({ club }) {
	return (
		<Col xs={12} md={6} lg={3} className="text-center pt-4">
			<Image
				className="imgClubConfig"
				src={`${club.logo}`}
				alt={club.teamName}
				fluid
			/>
			<h3 className="text-center clubName">{club.teamName}</h3>
			<Button size="sm" className="viewMoreButton">
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
