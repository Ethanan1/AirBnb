import './ReviewCard.css';
import { useSelector, useDispatch } from "react-redux";
import { deleteReview, editReview } from '../../store/reviews';
import { useState } from 'react';
import EditReviewForm from '../EditReview';

const ReviewCard = ({ review }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const isOwner = sessionUser.id === review.userId;
  const [isEditing, setIsEditing] = useState(false);

  const deleteHandler = () => {
    dispatch(deleteReview(review.id));
  };

  const editHandler = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return <EditReviewForm review={review} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <form className="review-form">
      <div className="review-card">
        <div>Review: {review.review}</div>
        <div>Stars: {review.stars}</div>
        {isOwner && (
          <div>
            <button className="review-delete-button" onClick={deleteHandler}>
              Delete
            </button>
            <button className="review-edit-button" onClick={editHandler}>
              Edit
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ReviewCard;
