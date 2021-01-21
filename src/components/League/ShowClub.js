import { Link } from 'react-router-dom'; //change to connect-router
import { Col, Button, Image } from 'react-bootstrap';

export default function ShowClub({ club }) {
	return (
		<Col xs={12} md={6} lg={4} xl={3} className="text-center pt-4 pb-3">
			<Image
				className="imgClubConfig"
				src={`${club.logo}`}
				alt={club.teamName}
				fluid
			/>
			<h2 className="text-center mt-2 mb-2">{club.teamName}</h2>
			<Button size="sm" className="viewMoreButton">
				<Link
					to={`/soccer/club/${club.seasonID}/${club.teamID}`}
					className="text-white text-decoration-none"
				>
					View more!
				</Link>
			</Button>
		</Col>
	);
}
