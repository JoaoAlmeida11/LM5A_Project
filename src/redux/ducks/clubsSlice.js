import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { schema, normalize } from 'normalizr';

const API_KEY = process.env.REACT_APP_API_KEY;

export const clubEntity = new schema.Entity('clubs');
export const clubListEntity = new schema.Entity('clubList', {
	list: [clubEntity],
});

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
		console.log('leagueListArray');
		console.log(leagueListArray);

		let seasonId;
		for (let item in leagueListArray) {
			if (item[1].id === leagueId) {
				seasonId = item[1].seasons[0].seasonId;
				break;
			}
		}
		// ! for some reason doesn't show on the console
		console.log('seasonId');
		console.log(seasonId);
		// let seasonId;

		// Object.entries(leagueList).forEach(item => {
		// 	console.log(item);
		// 	if (item[1].id === leagueId) {
		// 		seasonId = item[1].seasons[0].seasonId;
		// 		break;
		// 	}
		// });
		console.log(seasonId);
		// const seasonId = 1;

		const axios = require('axios').default;
		const response = await axios
			.get(
				`https://api.statorium.com/api/v1/seasons/${seasonId}/?apikey=${API_KEY}`
			)
			.then(res => {
				// ** get the ids of the clubs
				// console.log(res.data);
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
