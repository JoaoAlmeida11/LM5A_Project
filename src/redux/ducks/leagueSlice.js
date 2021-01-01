import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useBootstrapPrefix } from 'react-bootstrap/esm/ThemeProvider';

import apiKey from '../../apiKey';

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
		return response.data;
	}
);

export const leagueSlice = createSlice({
	name: 'league',
	initialState: {
		league: [],
		loading: 'idle',
		error: '',
	},
	extraReducers: {
		[fetchLeagues.fulfilled]: (state, action) => {},
	},
});

// export const { usersLoading, usersReceived } = usersSlice.actions;
