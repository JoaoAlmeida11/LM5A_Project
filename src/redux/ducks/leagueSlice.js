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
		.then(response => response.data)
		.catch(err => {
			console.log(err);
			return err;
		});
};
export const getAllData = urls => Promise.all(urls.map(fetchData));

export const fetchLeaguesAll = createAsyncThunk(
	'leagues/requestStatus',
	async () => {
		const axios = require('axios').default;
		const response = await axios
			.get(`https://api.statorium.com/api/v1/leagues/?apikey=${API_KEY}`)
			.then(res => {
				const leagueSet = new Set();
				// the key corresponds to the position on the array from the first call and its used to match each league with its image
				for (let i in res.data.leagues) leagueSet.add(res.data.leagues[i].id);
				return [...leagueSet];
			})
			.then(res => {
				const urlsSet = new Set();
				res.forEach(value => {
					urlsSet.add(
						`https://api.statorium.com/api/v1/leagues/${value}/?apikey=${API_KEY}`
					);
				});
				const urls = [...urlsSet];
				return getAllData(urls).then(res => res);
			})
			.catch(err => {
				console.log(err);
				return err;
			});

		// keeps only the leagues
		const leagueSet = new Set();
		for (let i in response) leagueSet.add(response[i].league);

		//keeps only the last season
		const onlyLastSeasonSet = new Set();
		leagueSet.forEach(item =>
			onlyLastSeasonSet.add(item.seasons[item.seasons.length - 1])
		);

		const leagueList = [...leagueSet];

		const normalized = normalize(leagueList, [leagueListEntity]);
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
export const { setLoadingToIdleLeagueSlice } = leagueSlice.actions;
