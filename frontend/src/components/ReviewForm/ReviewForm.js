import './ReviewForm.css';
import { useParams,useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react'
import { postReview } from '../../store/reviews';

const ReviewForm = () => {
    const { spotId } = useParams();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState([]);

    const updateReview = (e) => setReview(e.target.value);
    const updateStars = (e) => setStars(e.target.value);

    const dispatch = useDispatch();

    const spot = useSelector(state => state.spots[spotId]);
    const sessionUser = useSelector(state => state.session.user);

    const submitHandler = async (e) => {
        e.preventDefault();

        setErrors([])

        const isOwner = sessionUser.id === spot.ownerId;

        if (isOwner) {
         await setErrors(['You cannot review your own spot'])
        }

        const payload = {
            review,
            stars
        }

        if(errors.length === 0) {
            dispatch(postReview(payload, spotId))
            .then(()=> setReview(''))
            .then(()=> setStars(''))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
        }
    }

    return sessionUser.id ? (
        <div>
            <div className="error">
            {errors.length > 0 && errors.map((error) => {
               return <div>{error}</div>
            })}
            </div>
        <h4>Post a Review</h4>
            <form className ="review-form" onSubmit = {submitHandler}>
                <div>
                    <label>Review:</label>
                <input
                    type = "text"
                    value = {review}
                    required
                    onChange= {updateReview}
                 />
                </div>
                <div>
                    <label>Stars:</label>
                <input
                    type = "number"
                    value = {stars}
                    required
                    min = "1"
                    max = "5"
                    onChange={updateStars}
                 />
                </div>
                <button className="review-submit-button">Submit</button>
            </form>
        </div>
    ) :
    null;
}

export default ReviewForm;
