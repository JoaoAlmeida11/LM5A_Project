import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_KEY = process.env.REACT_APP_API_KEY;

// ** functions to call data from the API
// ! weird bug: if you go to one of the leagues, then the other, then back to the first you get CORS ERROR on the last...
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
// ** Functions on Promise Chaining that ask data
export const fetchClubIds = res => {
	// ** get the ids of the clubs as participants
	const seasonId =
		res.needsLeagueList === false
			? res.leagueId
			: res.league.seasons[res.league.seasons.length - 1].seasonID;
	const url = `https://api.statorium.com/api/v1/seasons/${seasonId}/?apikey=${API_KEY}`;
	return fetchAllData(url);
};
export const fetchEachClub = res => {
	// ** get each club
	const participants = res.season.participants;
	const seasonId = res.season.seasonID;
	const urlsSet = new Set();
	for (let i in participants) {
		urlsSet.add(
			`https://api.statorium.com/api/v1/teams/${participants[i].participantID}/?season_id=${seasonId}&apikey=${API_KEY}`
		);
	}
	const urlsArray = [...urlsSet];

	return Promise.all(urlsArray.map(fetchData));
};
// ** Promise Chaining
export const conditionalChaining = ({ needsLeagueList, leagueId }) => {
	if (needsLeagueList) {
		const url = `https://api.statorium.com/api/v1/leagues/${leagueId}/?apikey=${API_KEY}`;
		return fetchAllData(url);
	}
	return Promise.resolve({ needsLeagueList, leagueId });
};

// ** needs the seasonId
export const fetchClubs = createAsyncThunk(
	'clubs/requestStatus',
	async (leagueId, thunkAPI) => {
		// ** get the last season of the league from the store
		const state = thunkAPI.getState();
		const leagueList = state.league.leagueList;
		const leagueListArray = Object.entries(leagueList);

		// check if information already exists
		if (state.club.id === leagueId) {
			console.log('Store already has the info');
			return { changeStore: false };
		}

		const needsLeagueList = leagueListArray.length !== 0 ? false : true;

		const response = await conditionalChaining({ needsLeagueList, leagueId })
			.then(res => fetchClubIds(res))
			.then(res => fetchEachClub(res))
			.catch(error => {
				console.log(error);
				return error;
			});

		const teamsSet = new Set();
		for (let i in response) {
			teamsSet.add(response[i].team);
		}
		const teams = [...teamsSet];

		// !normalize not working and since it wasn't needed it was removed (schema.Array)
		return { teams, leagueId, changeStore: true };
	}
);

const clubsSlice = createSlice({
	name: 'clubs',
	initialState: {
		clubList: [],
		loading: 'idle',
		leagueId: '',
	},
	reducers: {},
	extraReducers: {
		[fetchClubs.pending]: state => {
			state.loading = 'pending';
		},
		[fetchClubs.fulfilled]: (state, { payload }) => {
			state.loading = 'success';

			// ** if the store already has the values doesn't cause a store change
			if (payload.changeStore) {
				state.clubList = payload.teams;
				state.leagueId = payload.leagueId;
			}
		},
		[fetchClubs.rejected]: state => {
			state.loading = 'failed';
		},
	},
});

export default clubsSlice.reducer;
export const { setLoadingToIdleClubsSlice } = clubsSlice.actions;
