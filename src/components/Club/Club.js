import { Container, Row, Col } from 'react-bootstrap';

import Stadium from './Stadium';
import PlayerList from './PlayerList';
import ClubInfo from './ClubInfo';

export default function Club() {
	return (
		<Container>
			<Row>
				<Col xs={12} lg={6}>
					<Stadium />
				</Col>
				<Col xs={12} lg={6}>
					<PlayerList />
				</Col>
			</Row>
			<Row>
				<Col xs={12}>
					<ClubInfo />
				</Col>
			</Row>
		</Container>
	);
}
