import './SpotCard.css';
import { useSelector, useDispatch } from "react-redux"
import { loadSingleSpot } from '../../store/spots';
import { Link } from 'react-router-dom';

const SpotCard = ({spot}) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    

    const getDetailsHandler = () => {
        dispatch(loadSingleSpot(spot.id))
    }
    return (
        <div className="spot-card">
            <div><img className="spot-card-preview-image" src={spot.previewImage}></img></div>
            <Link to={`/spots/${spot.id}`} onClick ={getDetailsHandler}>
            <div className="spot-name">{spot.name}</div>
            </Link>
            <div>{spot.city}, {spot.state}, {spot.country}</div>
            <div>$ {spot.price} night</div>
        </div>
        
    )
}

export default SpotCard;