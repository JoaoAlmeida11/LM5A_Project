import { Link } from 'react-router-dom';
import { Col, Button, Image } from 'react-bootstrap';

// shows each player belonging to a club/team
const ShowPlayer = ({ player, seasonId }) => (
	<Col xs={6} lg={3} className="text-center pb-4">
		<div className=" playerCard pt-2">
			<Image src={`${player.photo}`} alt={player.shortName} fluid />
			<h3 className="mb-0 mt-2">{player.shortName}</h3>
			<Button className="viewMoreButton mt-2 mb-2">
				<Link
					to={`/soccer/player/${seasonId}/${player.playerID}/`}
					className="text-white text-decoration-none"
				>
					View more!
				</Link>
			</Button>
		</div>
	</Col>
);

export default ShowPlayer;
