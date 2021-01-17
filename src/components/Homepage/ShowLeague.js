import { Link } from 'react-router-dom';
import { Col, Button, Image } from 'react-bootstrap';

export default function ShowLeague({ league }) {
	const altImage = 'League of ' + league.name;
	return (
		<Col xs={12} md={6} lg={4} className="text-center pt-4">
			<Image class="imgConfig" src={`${league.logo}`} alt={altImage} fluid />
			<Button className="homepageButtonLeague">
				<Link to={`/lm5a_project/league/${league.id}`} className="text-white">
					View more!
				</Link>
			</Button>
		</Col>
	);
}
