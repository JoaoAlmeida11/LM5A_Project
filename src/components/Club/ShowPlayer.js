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

// export default function ShowLeague({ league }) {
// 	const altImage = 'League of ' + league.name;
// 	return (
// 		<Col xs={12} md={6} lg={4}>
// 			<Image src={`${league.logo}`} alt={altImage} fluid />
// 			{/* <h3 className="text-center">{league.name}</h3> */}
// 			<Button className="homepageButtonLeague">
// 				<Link to={`/lm5a_project/league/${league.id}`} className="text-white">
// 					View more!
// 				</Link>
// 			</Button>
// 		</Col>
// 	);
// }
