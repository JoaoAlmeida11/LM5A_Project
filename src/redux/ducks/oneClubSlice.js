import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { schema, normalize } from 'normalizr';
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchData = url => {
	const axios = require('axios').default;
	return axios
		.get(url)
		.then(response => {
			return response.data;
		})
		.catch(err => {
			console.log(err);
			return err;
		});
};
export const fetchAllData = url => {
	return Promise.resolve(fetchData(url));
};

// ** get the club
export const fetchEachClub = ({ seasonId, clubId }) => {
	const url = `https://api.statorium.com/api/v1/teams/${clubId}/?season_id=${seasonId}&apikey=${API_KEY}`;
	return Promise.resolve(fetchAllData(url));
};

export const fetchOneClub = createAsyncThunk(
	'clubs/requestStatus',
	async ({ seasonId, clubId }, thunkAPI) => {
		const state = thunkAPI.getState();

		// check if store has data in oneClub.club
		const club = state.oneClub;
		if (club.seasonId === seasonId && club.clubId === clubId)
			return { changeStore: false };

		// check if store has data in club.clubList
		const clubList = state.club.clubList;
		for (let i in clubList) {
			if (clubList[i].seasonID === seasonId && clubList[i].teamID === clubId) {
				const storeData = clubList[i];
				return { storeData, changeStore: true };
			}
		}
		const response = await fetchEachClub({ seasonId, clubId });
		return { response, changeStore: true };
	}
);

const oneClubSlice = createSlice({
	name: 'clubs',
	// TODO: initial state needs to store an array like a map with a key being the id
	initialState: {
		club: [],
		loading: 'idle',
		clubId: '',
		seasonId: '',
	},
	reducers: {},
	extraReducers: {
		[fetchOneClub.pending]: (state, payload) => {
			state.loading = 'pending';
		},
		[fetchOneClub.fulfilled]: (state, { payload }) => {
			state.loading = 'success';

			// ** if the store already has the values doesn't cause a store change
			if (payload.changeStore) {
			}
		},
		[fetchOneClub.rejected]: state => {
			state.loading = 'failed';
		},
	},
});

export default oneClubSlice.reducer;
