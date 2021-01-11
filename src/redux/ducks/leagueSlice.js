import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { schema, normalize } from 'normalizr';

const API_KEY = process.env.REACT_APP_API_KEY;

export const leagueIdEntity = new schema.Entity('leagueId');
export const leagueLogoEntity = new schema.Entity('leagueLogo');
export const leagueNameEntity = new schema.Entity('leagueName');
// TODO: se schema of seasons
export const leagueSeasonsEntity = new schema.Entity('leagueSeasons');

export const leagueEntity = new schema.Entity('leagues', {
	id: Number,
	logo: String,
	name: String,
	seasons: [leagueSeasonsEntity],
});
export const leagueListEntity = new schema.Entity('leagueList', {
	list: [leagueEntity],
});
export const fetchData = url => {
	const axios = require('axios').default;
	return axios
		.get(url)
		.then(function (response) {
			return response.data;
		})
		.catch(function (err) {
			console.log(err);
			return err;
		});
};
export const getAllData = urls => {
	return Promise.all(urls.map(fetchData));
};
export const fetchLeaguesAll = createAsyncThunk(
	'leagues/requestStatus',
	async () => {
		const axios = require('axios').default;
		const response = await axios
			.get(`https://api.statorium.com/api/v1/leagues/?apikey=${API_KEY}`)
			.then(res => {
				const leagueSet = new Set();
				for (let i in res.data.leagues) {
					// the key corresponds to the position on the array from the first call and its used to match each league with its image
					leagueSet.add(res.data.leagues[i].id);
				}
				const ids = [...leagueSet];
				return ids;
			})
			.then(res => {
				const urls = [];
				res.forEach(value => {
					urls.push(
						`https://api.statorium.com/api/v1/leagues/${value}/?apikey=${API_KEY}`
					);
				});
				return getAllData(urls)
					.then(res => {
						console.log(res);
						return res;
					})
					.catch(err => {
						console.log(err);
						return err;
					});
			})
			.catch(err => {
				console.log(err);
				return err;
			});

		// keeps only the leagues
		const responseList = [];
		for (let i in response) {
			responseList.push(response[i].league);
		}

		// keeps only the last season
		for (let i in responseList) {
			responseList[i].seasons = [
				responseList[i].seasons[responseList[i].seasons.length - 1],
			];
		}

		const normalized = normalize(responseList, [leagueListEntity]);
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
