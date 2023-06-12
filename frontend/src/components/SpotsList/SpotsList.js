import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadAllSpots } from "../../store/spots";
import './SpotsList.css';
import SpotCard from "../SpotCard/SpotCard";

const SpotsList = (spots) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()

    const spotsObj = useSelector(state => state.spots)
    const spotsArr = Object.values(spotsObj);

    useEffect(() => {
        dispatch(loadAllSpots()).then(()=> setIsLoaded(true))
    }, [dispatch])

    return (
        <section className="spots-list-container">
            <h1 className="spots-list-heading">Find your next vacation</h1>
            <div className="spot-list-arrange">
                {spotsArr.map(spot => (
                    <SpotCard key={spot.id} spot={spot}></SpotCard>
                ))}
            </div>
        </section>
    )
}

export default SpotsList;
