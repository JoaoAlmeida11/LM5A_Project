import { Link } from 'react-router-dom';
import { Col, Button, Image } from 'react-bootstrap';

export default function ShowLeague({ league }) {
	const altImage = 'League of ' + league.name;
	return (
		<Col xs={12} md={6} lg={4} className="text-center pt-4 ">
			<div className="imgHeightLeague d-flex align-items-end justify-content-center">
				<Image
					className="imgConfig "
					src={`${league.logo}`}
					alt={altImage}
					fluid
				/>
			</div>
			<div className="pt-4">
				<Button className="viewMoreButton">
					<Link
						to={`/lm5a_project/league/${league.id}`}
						className="text-white text-decoration-none"
					>
						View more!
					</Link>
				</Button>
			</div>
		</Col>
	);
}
