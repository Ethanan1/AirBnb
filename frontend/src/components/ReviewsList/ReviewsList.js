import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { loadAllReviews } from '../../store/reviews';
import { loadAllSpots } from "../../store/spots";
import './ReviewsList.css';
import ReviewCard from "../ReviewCard/ReviewCard";

const ReviewsList = (spots) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()

    const { spotId } = useParams();

    const reviewsObj = useSelector(state => state.reviews);

    let reviewsArr = [];
    if(reviewsObj){
        reviewsArr = Object.values(reviewsObj);
    }
    const reviewSpotArr = reviewsArr.filter(review => (
        review.spotId == spotId
    ))

    useEffect(() => {
        dispatch(loadAllReviews(spotId))
        .then(()=> setIsLoaded(true))
    }, [dispatch])

    return (
        <section className="reviews-list-container">
            <h4 className="reviews-list-heading">Review List</h4>
            <div>{reviewSpotArr.map(review => (
                <ReviewCard key={review.id} review={review}></ReviewCard>
            ))}</div>
        </section>
    )
}

export default ReviewsList;
