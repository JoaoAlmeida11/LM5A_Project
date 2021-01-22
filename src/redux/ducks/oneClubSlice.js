import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_KEY = process.env.REACT_APP_API_KEY;

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

// ** get the club
export const fetchEachClub = ({ seasonId, clubId }) =>
	fetchData(
		`https://api.statorium.com/api/v1/teams/${clubId}/?season_id=${seasonId}&apikey=${API_KEY}`
	);

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
		const clubResponse = response.team;
		return { clubResponse, changeStore: true, seasonId, clubId };
	}
);

const oneClubSlice = createSlice({
	name: 'clubs',
	initialState: {
		oneClubInfo: [],
		loading: 'idle',
		clubId: '',
		seasonId: '',
	},
	reducers: {},
	extraReducers: {
		[fetchOneClub.pending]: state => {
			state.loading = 'pending';
		},
		[fetchOneClub.fulfilled]: (state, { payload }) => {
			state.loading = 'success';

			// ** if the store already has the values doesn't cause a store change
			if (payload.changeStore) {
				state.clubId = payload.clubId;
				state.seasonId = payload.seasonId;
				state.oneClubInfo = payload.clubResponse;
			}
		},
		[fetchOneClub.rejected]: state => {
			state.loading = 'failed';
		},
	},
});

export default oneClubSlice.reducer;
export const { setLoadingToIdleOneClubSlice } = oneClubSlice.actions;
