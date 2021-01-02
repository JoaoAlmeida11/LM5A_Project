import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { schema, normalize } from 'normalizr';
import { API_KEY } from '../../apiKey';
// access API key
// require('dotenv').config();
// dotenv.config();
// const API_KEY = process.env.API_KEY;

export const leagueEntity = new schema.Entity('leagues');

export const fetchLeagues = createAsyncThunk(
	'leagues/requestStatus',
	async () => {
		//pass an obj with id (only allows one)
		const axios = require('axios').default;
		const response = await axios
			.get(`https://api.statorium.com/api/v1/leagues/?apikey=${API_KEY}`)
			.then(res => {
				console.log(res.data);
				return res.data;
			})
			.catch(err => {
				console.log(err);
				return err;
			});
		// additional call for image base on id
		// https://api.statorium.com/api/v1/leagues/1/?apikey=123_test_token_123

		const normalized = normalize(response.leagues, [leagueEntity]);
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
		[fetchLeagues.pending]: state => {
			state.loading = 'pending';
		},
		[fetchLeagues.fulfilled]: (state, { payload }) => {
			state.loading = 'success';
			state.leagueList = payload.leagues;
		},
		[fetchLeagues.rejected]: state => {
			state.loading = 'failed';
		},
	},
});

export const selectLeagues = ({ leagues }) => leagues;

export default leagueSlice.reducer;
