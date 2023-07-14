import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReview } from '../../store/reviews';

const EditReviewForm = ({ review, onCancel }) => {
  const [editedReview, setEditedReview] = useState(review.review);
  const [editedStars, setEditedStars] = useState(review.stars);
  const dispatch = useDispatch();

  const handleReviewChange = (e) => {
    setEditedReview(e.target.value);
  };

  const handleStarsChange = (e) => {
    setEditedStars(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedReview = {
      ...review,
      review: editedReview,
      stars: editedStars,
    };
    dispatch(editReview(updatedReview, review.id));

    // Reset form fields or perform any necessary actions after editing the review
    setEditedReview('');
    setEditedStars('');

    // Exit editing mode
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="edit-review-form">
      <textarea value={editedReview} onChange={handleReviewChange} />
      <input
        type="number"
        value={editedStars}
        onChange={handleStarsChange}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditReviewForm;
