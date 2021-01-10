import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { schema, normalize } from 'normalizr';

const API_KEY = process.env.REACT_APP_API_KEY;

export const leagueIdEntity = new schema.Entity('leagueId');
export const leagueLogoEntity = new schema.Entity('leagueLogo');
export const leagueNameEntity = new schema.Entity('leagueName');
export const leagueSeasonsEntity = new schema.Entity('leagueSeasons');

// TODO: se if schema can be setted to primitive type
export const leagueEntity = new schema.Entity('leagues', {
	id: [leagueIdEntity],
	logo: [leagueLogoEntity],
	name: [leagueNameEntity],
	seasons: [leagueSeasonsEntity],
});
export const leagueListEntity = new schema.Entity('leagueList', {
	list: [leagueEntity],
});

export const fetchLeaguesAll = createAsyncThunk(
	'leagues/requestStatus',
	async () => {
		//pass an obj with id (only allows one)
		const axios = require('axios').default;
		// the API calls can't be done with Promise.All do to needing the ids from the first call

		const firstCall = new Promise((fulfilled, reject) => {
			const response = axios
				.get(`https://api.statorium.com/api/v1/leagues/?apikey=${API_KEY}`)
				.then(res => {
					console.table(res.data);
					const leagueSet = new Set();
					for (let i in res.data.leagues) {
						// the key corresponds to the position on the array from the first call and its used to match each league with its image
						leagueSet.add(res.data.leagues[i].id);
					}

					fulfilled(leagueSet);

					// return res.data;
				})
				.catch(err => {
					console.log('err');
					reject(err);
					return err;
				});
		});
		const response = firstCall.then(leagueSet => {
			console.log('YAA');
			console.log(leagueSet);
			const urls = new Set();
			leagueSet.forEach(value => {
				urls.add(
					`https://api.statorium.com/api/v1/leagues/${value}/?apikey=f74d57716d0cb84d043c77b384885aeb`
				);
			});
			console.log(urls);
			// let a = 0;
			// for (let item in leagueSet) {
			// 	console.log('item');
			// 	console.log(item);
			// 	// if (a === 0) {
			// 	// 	const url1 = axios.get(
			// 	// 		`https://api.statorium.com/api/v1/leagues/${item}/?apikey=f74d57716d0cb84d043c77b384885aeb`
			// 	// 	);
			// 	// 	a += 1;
			// 	// } else {
			// 	// 	const url2 = axios.get(
			// 	// 		`https://api.statorium.com/api/v1/leagues/${item}/?apikey=f74d57716d0cb84d043c77b384885aeb`
			// 	// 	);
			// 	// }
			// }

			// console.log(url1);
			// console.log(url2);
			// const url1 = axios.get(
			// 	`https://api.statorium.com/api/v1/leagues/${value}/?apikey=f74d57716d0cb84d043c77b384885aeb`
			// );

			// leagueSet.forEach(value => {

			// }

			// leagueSet.forEach(value => {
			// 	const response = axios
			// 		.get(
			// 			`https://api.statorium.com/api/v1/leagues/${value}/?apikey=f74d57716d0cb84d043c77b384885aeb`
			// 		)
			// 		.then(res => {
			// 			// console.log(res.data);
			// 			return res.data;
			// 		})
			// 		.catch(err => {
			// 			console.log(err);
			// 			return err;
			// 		});
			// });
			console.log(response);
			return response;
		});
		const normalized = normalize(response.leagues, [leagueListEntity]);
		return normalized.entities;
		// const response =  new Promise.all()

		//  otherCalls = new Promise.all(

		//  )
		//  responseImage = leagueSet.forEach(value => {
		// 	return axios
		// 		.get(
		// 			`https://api.statorium.com/api/v1/leagues/${value}/?apikey=f74d57716d0cb84d043c77b384885aeb`
		// 		)
		// 		.then(res => {
		// 			console.log(res.data);
		// 			return;
		// 		})
		// 		.catch(err => {
		// 			console.log(err);
		// 			reject(err)
		// 			return err;
		// 		});
		// });
		// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
		// console.log(responseImage);

		// }
		// const normalized = normalize(response.leagues, [leagueListEntity]);
		// return normalized.entities;
	}
);

const leagueSlice = createSlice({
	name: 'leagues',
	initialState: {
		leagueList: [],
		loading: 'idle',
	},
	reducers: {},
	extraReducers: {
		[fetchLeaguesAll.pending]: state => {
			state.loading = 'pending';
		},
		[fetchLeaguesAll.fulfilled]: (state, { payload }) => {
			state.loading = 'success';

			state.leagueList = payload.leagueList;
		},
		[fetchLeaguesAll.rejected]: state => {
			state.loading = 'failed';
		},
	},
});

export default leagueSlice.reducer;
