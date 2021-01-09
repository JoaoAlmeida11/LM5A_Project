import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { schema, normalize } from 'normalizr';

const API_KEY = process.env.REACT_APP_API_KEY;

export const leagueEntity = new schema.Entity('leagues');
export const leagueListEntity = new schema.Entity('leagueList', {
	list: [leagueEntity],
});

export const fetchLeaguesAll = createAsyncThunk(
	'leagues/requestStatus',
	async () => {
		//pass an obj with id (only allows one)
		const axios = require('axios').default;
		// the API calls can't be done with Promise.All do to needing the ids from the first call
		const response = await axios
			.get(`https://api.statorium.com/api/v1/leagues/?apikey=${API_KEY}`)
			.then(res => {
				console.table(res.data);
				const leagueMap = new Map();
				for (let i in res.data.leagues) {
					// the key corresponds to the position on the array from the first call and its used to match each league with its image
					leagueMap.set(i, res.data.leagues[i].id);
				}
				const responseImage = leagueMap.forEach(value => {
					return axios
						.get(
							`https://api.statorium.com/api/v1/leagues/${value}/?apikey=f74d57716d0cb84d043c77b384885aeb`
						)
						.then(res => {
							console.log(res.data);
							return;
						})
						.catch(err => {
							console.log(err);
							return err;
						});
				});

				// for (let a in leagueMap.values) {
				// 	axios
				// 		.get(
				// 			`https://api.statorium.com/api/v1/leagues/${a}/?apikey=f74d57716d0cb84d043c77b384885aeb`
				// 		)
				// 		.then(res => {
				// 			console.log(res.data);
				// 			return
				// 		})
				// 		.catch(err => {
				// 			console.log(err);
				// 			return err;
				// 		});
				// }

				// axios.get()
				return res.data;
			})
			.catch(err => {
				console.log(err);
				return err;
			});

		const normalized = normalize(response.leagues, [leagueListEntity]);
		return normalized.entities;
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
