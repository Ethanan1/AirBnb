import { csrfFetch } from './csrf'

const LOAD_SPOTS = "spots/loadSpots";
const LOAD_SPOT = "spots/loadOneSpot"
const ADD_SPOT = "spots/addSpot"
const REMOVE_SPOT = "spots/removeSpot"
const EDIT_SPOT = "spots/editSpot"

const loadSpots = (spots) => ({
	type: LOAD_SPOTS,
	spots
});

const loadOneSpot =(spot) => ({
	type: LOAD_SPOT,
	spot
})

const addSpot = (spot) => ({
	type:ADD_SPOT,
	spot
})

const removeSpot = (spotId) => ({
	type:REMOVE_SPOT,
	spotId
})

const editSpot = (spot) => ({
	type:EDIT_SPOT,
	spot
})

export const loadAllSpots = () => async (dispatch) => {
	const res = await csrfFetch("/api/spots");

	if (res.ok){
		const spots = await res.json();
		dispatch(loadSpots(spots))
	}

}

export const loadSingleSpot = (spotId) => async (dispatch) => {
	const res = await fetch(`/api/spots/${spotId}`);

	if (res.ok) {
		const spot = await res.json();
		console.log(spot)
		console.log(spot.avgStarRating)
		console.log(spot.numReviews)
		return dispatch(loadOneSpot(spot))
	}
}

export const postSpot = (spot) => async (dispatch) =>{

	const res = await csrfFetch("/api/spots", {
		method: 'POST',
		body: JSON.stringify(spot)
	});

	if (res.ok) {
		const spot = await res.json();
		return dispatch(addSpot(spot));
	}
	return res
}

export const deleteSpot = (spotId) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}`,{
		method: 'DELETE'
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(removeSpot(spotId))
	}
}

export const changeSpot = (payload) => async (dispatch) => {
	const spotId = payload.spotId
	const res = await csrfFetch(`/api/spots/${spotId}/edit`,{
		method: 'PUT',
		body: JSON.stringify(payload)
	});

	if (res.ok) {
		const data = await res.json();
		console.log(data)
		dispatch(editSpot(data))
	}
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
	let newState
	switch (action.type) {
		case LOAD_SPOTS:
			newState = {...state}
			action.spots.Spots.forEach(spot => {
				newState[spot.id] = spot
			})
			return newState

		case LOAD_SPOT:
			newState = {...state}
			newState[action.spot.id] = action.spot;
			return newState

		case ADD_SPOT:
			newState = {...state}
			newState[action.spot.id] = action.spot;
			return newState;

		case REMOVE_SPOT:
			newState = { ...state };
			delete newState[action.spotId];
			return newState;


		case EDIT_SPOT:
			newState = {...state}
			console.log(newState)
			newState[action.spot.id] = action.spot;
			return newState;

		default :
			return state
	}
}

export default spotsReducer
