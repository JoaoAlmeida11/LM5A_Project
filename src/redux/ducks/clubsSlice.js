import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { schema, normalize } from 'normalizr';

const API_KEY = process.env.REACT_APP_API_KEY;

export const clubEntity = new schema.Entity('clubs');
export const clubListEntity = new schema.Entity('clubList', {
	list: [clubEntity],
});

export const fetchSeasonIdAxios = leagueId => {
	const axios = require('axios').default;
	return axios
		.get(
			`https://api.statorium.com/api/v1/leagues/${leagueId}/?apikey=${API_KEY}`
		)
		.then(function (response) {
			console.log('fetchSeasonIdAxios');
			console.log(response.data);
			return response.data;
		})
		.catch(function (err) {
			console.log(err);
			return err;
		});
};
export const fetchSeasonId = leagueId => {
	return Promise.resolve(fetchSeasonIdAxios(leagueId));
};

// ** needs the seasonId
export const fetchClubs = createAsyncThunk(
	'clubs/requestStatus',
	async (leagueId, thunkAPI) => {
		// ** get the last season of the league from the store
		// ! this page can't be de first to be opened so there needs to be an automatic redirect or something
		const state = thunkAPI.getState();
		const leagueList = state.league.leagueList;

		// to transform object into an array
		const leagueListArray = Object.entries(leagueList);
		console.log('leagueList');
		console.log(leagueList);
		console.log('leagueListArray');
		console.log(leagueListArray);

		let seasonId;
		// console.log('leagueListArray.length');
		// console.log(leagueListArray.length);

		// console.log('state');
		// console.log(state);
		console.log('state.league.leagueList');
		console.log(state.league.leagueList);
		let response;
		if (leagueListArray !== null || leagueListArray !== undefined) {
			// get the existing ids of the leagues in the store
			let storeLeagueIds = [];
			for (let i in state.league.leagueList) {
				storeLeagueIds.push(state.league.leagueList[i].seasons[0].seasonID);
			}
			console.log('storeLeagueIds');
			console.log(storeLeagueIds);
			seasonId = storeLeagueIds[storeLeagueIds.length - 1];
			const axios = require('axios').default;
			response = await axios
				.get(
					`https://api.statorium.com/api/v1/seasons/${seasonId}/?apikey=${API_KEY}`
				)
				.then(res => {
					// ** get the ids of the clubs
					console.log(res.data);
					console.log('YAA');
					return res.data;
				})
				// .then(res =>{
				// ** get the data of each club

				// })
				.catch(err => {
					console.log('NOO');

					console.log(err);
					return err;
				});
		} else {
			// call API to get the last seasonID of each league
			console.log('Store is empty!');
			const response = fetchSeasonId(leagueId)
				.then(res => {
					console.log('InMainThunk');
					console.log(res);
					return res;
				})
				.catch(err => {
					console.log(err);
					return err;
				});
			console.log('response');
			console.log(response);
		}

		state.league.leagueList.forEach(item => {
			console.log(item);
		});

		// console.log(response);
		const normalized = normalize(response.leagues, [clubListEntity]);
		return normalized.entities;
	}
);

const clubsSlice = createSlice({
	name: 'clubs',
	initialState: {
		leagueId: {
			id: '',
			clubList: [],
			loading: 'idle',
		},
	},
	reducers: {},
	extraReducers: {
		[fetchClubs.pending]: state => {
			state.leagueId.loading = 'pending';
		},
		[fetchClubs.fulfilled]: (state, { payload }) => {
			state.leagueId.loading = 'success';
			console.log('payload');
			console.log(payload);
			state.clubList = payload.clubList;
		},
		[fetchClubs.rejected]: state => {
			state.leagueId.loading = 'failed';
		},
	},
});

export default clubsSlice.reducer;
