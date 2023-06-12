import { csrfFetch } from './csrf'

const LOAD_REVIEWS = "reviews/loadReviews";
const LOAD_MYREVIEWS = "reviews/loadmyReviews"
const ADD_REVIEW = "reviews/addReview"
const REMOVE_REVIEW = "reviews/removeReview"

const loadReviews = (spotId) => ({
	type: LOAD_REVIEWS,
	spotId
});

const loadMyReviews =(reviews) => ({
	type: LOAD_MYREVIEWS,
	reviews
})

const addReview = (review, spotId) => ({
	type:ADD_REVIEW ,
	review,
    spotId
})

const removeReview = (reviewId) => ({
	type:REMOVE_REVIEW,
	reviewId
})

export const loadAllReviews = (spotId) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

	if (res.ok){
		const data = await res.json();
		dispatch(loadReviews(data))
	}

}

export const loadReviewsbyMe = () => async (dispatch) => {
	const res = await fetch("/api/me/reviews");

	if (res.ok) {
		const reviews = await res.json();
		return dispatch(loadMyReviews(reviews))
	}
}

export const postReview = (review, spotId) => async (dispatch) =>{

	const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
		method: 'POST',
		body: JSON.stringify(review)
	});

	if (res.ok) {
		const review = await res.json();
		return dispatch(addReview(review));
	}
	return res
}

export const deleteReview = (reviewId) => async (dispatch) => {
	const res = await csrfFetch(`/api/reviews/${reviewId}`,{
		method: 'DELETE'
	});
	console.log(reviewId)

	if (res.ok) {
		dispatch(removeReview(reviewId))
	}
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
	let newState
	switch (action.type) {
		case LOAD_REVIEWS:
			newState = {...state}
			action.spotId.Reviews.forEach(review => {
				newState[review.id] = review
			})
			return newState

		case LOAD_MYREVIEWS:
				newState = {...state}
				action.reviews.Reviews.forEach(review => {
					newState[review.id] = review
				})
				return newState	
							
		case ADD_REVIEW:
			newState = {...state}
			console.log(newState)
			newState[action.review.id] = action.review;
			return newState;
		
		case REMOVE_REVIEW:
			newState = {...state}
			delete newState[action.reviewId];
			return newState;	
			
		default :
			return state	
	}
}

export default reviewsReducer