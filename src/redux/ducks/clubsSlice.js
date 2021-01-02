import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { schema, normalize } from 'normalizr';

const API_KEY = process.env.REACT_APP_API_KEY;

export const clubEntity = new schema.Entity('clubs');
export const clubListEntity = new schema.Entity('clubList', {
	list: [clubEntity],
});

export const fetchClubs = createAsyncThunk('clubs/requestStatus', async () => {
	//pass an obj with id (only allows one)
	const axios = require('axios').default;
	const response = await axios
		.get(`https://api.statorium.com/api/v1/standings/1?apikey=${API_KEY}`)
		.then(res => {
			// console.log(res.data);
			return res.data;
		})
		.catch(err => {
			console.log(err);
			return err;
		});
	// additional call for image base on id
	// https://api.statorium.com/api/v1/leagues/1/?apikey=123_test_token_123

	// console.log(response);
	const normalized = normalize(response.leagues, [clubListEntity]);
	return normalized.entities;
});

const clubsSlice = createSlice({
	name: 'clubs',
	initialState: {
		clubList: [],
		loading: 'idle',
	},
	reducers: {},
	extraReducers: {
		[fetchClubs.pending]: state => {
			state.loading = 'pending';
		},
		[fetchClubs.fulfilled]: (state, { payload }) => {
			state.loading = 'success';
			state.clubList = payload.clubList;
		},
		[fetchClubs.rejected]: state => {
			state.loading = 'failed';
		},
	},
});

export default clubsSlice.reducer;
