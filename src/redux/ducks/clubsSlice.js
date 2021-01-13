import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { schema, normalize } from 'normalizr';

const API_KEY = process.env.REACT_APP_API_KEY;

export const clubEntity = new schema.Entity('clubs');
export const clubListEntity = new schema.Entity('clubList', {
	list: [clubEntity],
});

// ** functions to call data from the API
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
export const fetchAllData = url => {
	return Promise.resolve(fetchData(url));
};
export const fetchAllDataConcurrently = urls => {
	return Promise.all(urls.map(fetchData));
};

// ** Functions on Promise Chaining that ask data
export const fetchPlayersId = res => {
	// ** get the ids of the clubs as participants
	const seasonId = res.league.seasons[res.league.seasons.length - 1].seasonID;
	const url = `https://api.statorium.com/api/v1/seasons/${seasonId}/?apikey=${API_KEY}`;
	return fetchAllData(url);
};
export const fetchEachClub = res => {
	console.log('fetchEachClub - Here');
	console.log(res);
	const participants = res.season.participants;
	console.log('participants');
	console.log(participants);

	let urls = [];
	for (let i in participants) {
		console.log(i);
		// urls.push()
	}

	return Promise.resolve(true);
	// return Promise.resolve(fetchAllDataConcurrently(url));
};
// ** Promise Chaining
// function myPromiseFunction(needsLeagueList) {
// 	//Change the resolved value to take a different path
// 	return Promise.resolve(needsLeagueList);
// }
export const conditionalChaining = ({ needsLeagueList, leagueId }) => {
	// console.log('needsLeagueList');
	// console.log(needsLeagueList);
	// console.log('leagueId');
	// console.log(leagueId);

	if (needsLeagueList) {
		// console.log('about to do leagueId API call');
		const url = `https://api.statorium.com/api/v1/leagues/${leagueId}/?apikey=${API_KEY}`;
		return fetchAllData(url);
	} else {
		return Promise.resolve(true);
	}
};

// ** needs the seasonId
export const fetchClubs = createAsyncThunk(
	'clubs/requestStatus',
	async (leagueId, thunkAPI) => {
		// ** get the last season of the league from the store
		// ! this page can't be de first to be opened so there needs to be an automatic redirect or something
		const state = thunkAPI.getState();
		const leagueList = state.league.leagueList;

		// to transform object into an array
		const leagueListArray = Object.entries(leagueList);
		console.log('leagueList');
		console.log(leagueList);
		console.log('leagueListArray');
		console.log(leagueListArray);

		// let url;
		// let seasonId;

		// code improvement
		let needsLeagueList = leagueListArray.length !== 0 ? false : true;

		const response = conditionalChaining({ needsLeagueList, leagueId }) //**working */
			.then(res => {
				console.log('All done! - Success');
				// console.log(res);
				return res;
			})
			.then(res => {
				return fetchPlayersId(res);
			})
			.then(res => {
				return fetchEachClub(res);
			})
			.catch(error => {
				console.log(error);
				return error;
			});

		// if (leagueListArray.length !== 0) {
		// 	// get the existing ids of the leagues in the store
		// 	let storeLeagueIds = [];
		// 	for (let i in state.league.leagueList) {
		// 		storeLeagueIds.push(state.league.leagueList[i].seasons[0].seasonID);
		// 	}

		// 	// ** fetch the id of the clubs of a league (participantID)
		// 	seasonId = storeLeagueIds[storeLeagueIds.length - 1]; //retrieve the last position of the seasons array
		// 	console.log(seasonId);
		// 	// const axios = require('axios').default;
		// 	url = `https://api.statorium.com/api/v1/seasons/${seasonId}/?apikey=${API_KEY}`;
		// 	response = fetchAllData(url)
		// 		.then(res => {
		// 			// ** get the ids of the clubs as participants
		// 			console.log(res);
		// 			console.log('YAA');
		// 			return res.season;
		// 		})
		// 		.then(res => {
		// 			// ** get the data of each club
		// 			// needs seasonID and participantID
		// 			// needs the urls in an array
		// 			console.log(res);
		// 			response = fetchAllDataConcurrently(res);
		// 			console.log('fetchAllDataConcurrently');
		// 			console.log(response);
		// 		})
		// 		.catch(err => {
		// 			console.log('NOO');

		// 			console.log(err);
		// 			return err;
		// 		});
		// } else {
		// 	// call API to get the last seasonID of each league
		// 	console.log('Store is empty!');
		// 	let url = `https://api.statorium.com/api/v1/leagues/${leagueId}/?apikey=${API_KEY}`;
		// 	response = fetchAllData(url)
		// 		.then(res => {
		// 			console.log('InMainThunk');
		// 			console.log(res);
		// 			return res;
		// 		})
		// 		.then(res => {
		// 			// retrive the seasonId
		// 			seasonId = res.league.seasons[res.league.seasons.length - 1].seasonID;
		// 			console.log('seasonId');
		// 			console.log(seasonId);
		// 			url = `https://api.statorium.com/api/v1/seasons/${seasonId}/?apikey=${API_KEY}`;
		// 			// ** get the ids of the clubs as participants
		// 			response = fetchAllData(url);
		// 			console.log('PlayersId');
		// 			console.log(response);
		// 			// extractSeasonId(r)
		// 		})
		// 		.then(res => {
		// 			// ** get the data of each club
		// 			// needs seasonID and participantID
		// 			// needs the urls in an array

		// 			// response = fetchAllDataConcurrently(res);
		// 			console.log('fetchAllDataConcurrently');
		// 			console.log(res);
		// 			// console.log(response);
		// 		})
		// 		.catch(err => {
		// 			console.log(err);
		// 			return err;
		// 		});
		// 	console.log('response');
		// 	console.log(response);
		// }

		// console.log(response);
		const normalized = normalize(response.leagues, [clubListEntity]);
		return normalized.entities;
	}
);

const clubsSlice = createSlice({
	name: 'clubs',
	initialState: {
		leagueId: {
			id: '',
			clubList: [],
			loading: 'idle',
		},
	},
	reducers: {},
	extraReducers: {
		[fetchClubs.pending]: state => {
			state.leagueId.loading = 'pending';
		},
		[fetchClubs.fulfilled]: (state, { payload }) => {
			state.leagueId.loading = 'success';
			console.log('payload');
			console.log(payload);
			state.clubList = payload.clubList;
		},
		[fetchClubs.rejected]: state => {
			state.leagueId.loading = 'failed';
		},
	},
});

export default clubsSlice.reducer;
