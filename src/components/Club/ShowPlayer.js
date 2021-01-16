import { Link } from 'react-router-dom';
import { Col, Button, Image } from 'react-bootstrap';

const ShowPlayer = ({ player, seasonId }) => {
	return (
		<Col xs={12} md={6} lg={4}>
			<Image src={`${player.photo}`} alt={player.shortName} fluid />
			<Button className="homepageButtonLeague">
				<Link
					to={`/lm5a_project/player/${seasonId}/${player.playerID}/`}
					className="text-white"
				>
					View more!
				</Link>
			</Button>
		</Col>
	);
};

export default ShowPlayer;
