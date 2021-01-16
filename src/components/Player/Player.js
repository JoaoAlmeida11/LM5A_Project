import { useParams } from 'react-router-dom';

const Player = () => {
	const { seasonId, playerId } = useParams;
	console.log('seasonId');
	console.log(seasonId);
	console.log('playerId');
	console.log(playerId);

	return <div></div>;
};

export default Player;
