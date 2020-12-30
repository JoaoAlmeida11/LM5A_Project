import Stadium from './Stadium';
import PlayerList from './PlayerList';
import ClubInfo from './ClubInfo';

export default function Club() {
	return (
		<main className="container">
			<section className="row">
				<article className="col-12 col-lg-6">
					<Stadium />
				</article>
				<article className="col-12 col-lg-6">
					<PlayerList />
				</article>
			</section>
			<section className="row">
				<ClubInfo />
			</section>
		</main>
	);
}
