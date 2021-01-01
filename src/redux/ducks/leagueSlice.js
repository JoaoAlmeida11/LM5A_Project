import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';

import apiKey from '../../apiKey';
import { schema, normalize } from 'normalizr';

export const leagueEntity = new schema.Entity('leagues');

const leaguesAdapter = createEntityAdapter();

const fetchLeagues = createAsyncThunk(
	'leagues/requestStatus',
	async (_, thunkAPI) => {
		const axios = require('axios').default;
		const response = await axios
			.get(`https://api.statorium.com/api/v1/leagues/?apikey=${apiKey}`)
			.then(res => {
				console.log(res.json());
				return res;
			})
			.catch(err => {
				console.log(err);
				return err;
			});
		// additional call for image base on id
		// https://api.statorium.com/api/v1/leagues/1/?apikey=123_test_token_123

		const normalized = normalize(response.entities, leagueEntity);
		return normalized.entities;
	}
);

export const leagueSlice = createSlice({
	name: 'league',
	initialState: leaguesAdapter.getInitialState(),
	// initialState: {
	// 	league: [],
	// 	loading: 'idle',
	// 	error: '',
	// },
	extraReducers: {
		[fetchLeagues.fulfilled]: (state, action) => {
			//handle result
			// state.league.push(action.payload);
			leaguesAdapter.upsertMany(state, action.payload.leagues);
		},
	},
});
export default leagueSlice;

// Rename the exports for readability in component usage
export const {
	selectById: selectLeagueById,
	selectIds: selectLeagueIds,
	selectEntities: selectLeagueEntities,
	selectAll: selectAllLeagues,
	selectTotal: selectTotalLeagues,
} = leaguesAdapter.getSelectors(state => state.leagues);

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))
