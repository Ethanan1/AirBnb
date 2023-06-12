import './ReviewCard.css';
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom';
import { deleteReview } from '../../store/reviews';

const ReviewCard = ({review}) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const isOwner = sessionUser.id === review.userId;

    const deleteHandler = () => {
        dispatch(deleteReview(review.id))
    }

    return (
        <form className = "review-form">
        <div className="review-card">        
            <div>Review: {review.review}</div>
            <div>Stars: {review.stars}</div>
            {isOwner && <button className="review-delete-button" onClick={deleteHandler}>Delete</button>}
        </div>
        </form>
        
    )
}

export default ReviewCard;