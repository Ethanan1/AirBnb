import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { loadReviewsbyMe } from '../../store/reviews';
import ReviewCard from "../ReviewCard/ReviewCard";

const ReviewDetail = ( reviews ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    
    const reviewsObj = useSelector(state => state.reviews);

    let reviewsArr = [];
    if(reviewsObj){
        reviewsArr = Object.values(reviewsObj);
    }

    useEffect(() => {
            dispatch(loadReviewsbyMe())
                .then(res => setIsLoaded(true));
    }, [dispatch]);
    


    return (
            isLoaded && (
                <section> Review List
                <div>{reviewsArr.map(review => (
                    <ReviewCard key={review.id} review = {review}></ReviewCard>
                ))}</div>
                </section>
        
       )
    )
}

export default ReviewDetail