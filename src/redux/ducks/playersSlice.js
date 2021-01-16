import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { schema, normalize } from 'normalizr';

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchOnePlayer = createAsyncThunk(
	'clubs/requestStatus',
	async ({ seasonId, clubId }, thunkAPI) => {
		console.log('fetchOneClub');

		const state = thunkAPI.getState();

		// check if store has data in oneClub.club
		// const club = state.oneClub;
		// if (club.seasonId === seasonId && club.clubId === clubId)
		// 	return { changeStore: false };

		// check if store has data in club.clubList
		const clubList = state.club.clubList;
		// for (let i in clubList) {
		// 	if (clubList[i].seasonID === seasonId && clubList[i].teamID === clubId) {
		// 		const storeData = clubList[i];
		// 		console.log('storeData');
		// 		console.log(storeData);
		// 		return { storeData, changeStore: true };
		// 	}
		// }
		// const response = await fetchEachClub({ seasonId, clubId });
		// const clubResponse = response.team;
		// console.log('clubResponse');
		// console.log(clubResponse);
		// return { clubResponse, changeStore: true, seasonId, clubId };
	}
);

const playersSlice = createSlice({
	name: 'clubs',
	// TODO: initial state needs to store an array like a map with a key being the id
	initialState: {
		onePlayerInfo: [],
		loading: 'idle',
		clubId: '',
		seasonId: '',
	},
	reducers: {
		// to be call when entering other pages
		setLoadingToIdlePlayersSlice(state) {
			// console.table([1, 2, 3, 4]);
			// console.log('setLoadingToIdleOneClubSlice');
			state.loading = 'idle';
		},
	},
	extraReducers: {
		[fetchOnePlayer.pending]: state => {
			state.loading = 'pending';
		},
		[fetchOnePlayer.fulfilled]: (state, { payload }) => {
			state.loading = 'success';

			// ** if the store already has the values doesn't cause a store change
			if (payload.changeStore) {
				// state.clubId = payload.clubId;
				// state.seasonId = payload.seasonId;
				// state.oneClubInfo = payload.clubResponse;
			}
		},
		[fetchOnePlayer.rejected]: state => {
			state.loading = 'failed';
		},
	},
});

export default playersSlice.reducer;
export const { setLoadingToIdlePlayersSlice } = playersSlice.actions;
