import { Link } from 'react-router-dom';
import { Col, Button, Image } from 'react-bootstrap';

const ShowPlayer = ({ player, seasonId }) => {
	return (
		<Col xs={4} md={3} lg={2} className="text-center">
			<Image
				className="border border-secondary "
				src={`${player.photo}`}
				alt={player.shortName}
				fluid
			/>
			<Button className="viewMoreButton mt-2 mb-3">
				<Link
					to={`/soccer/player/${seasonId}/${player.playerID}/`}
					className="text-white"
				>
					View more!
				</Link>
			</Button>
		</Col>
	);
};

export default ShowPlayer;
