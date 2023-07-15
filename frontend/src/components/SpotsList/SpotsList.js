import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadAllSpots } from "../../store/spots";
import './SpotsList.css';
import SpotCard from "../SpotCard/SpotCard";
import { Link } from 'react-router-dom';

const SpotsList = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots);
    const spotsArr = Object.values(spotsObj);
    const isLoggedIn = useSelector(state => state.session.user);
    console.log(isLoggedIn, "spotlist component")

    useEffect(() => {
        dispatch(loadAllSpots()).then(() => setIsLoaded(true));
    }, [dispatch]);

    const scrollToForm = () => {
        if (!isLoggedIn) {
            alert('You must be logged in');
        } else
        {
        const formSection = document.getElementById("form-section");
        formSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="spots-list-container">
            <div className="top-right-links">
            <Link to="/about">About</Link>
            </div>
            <h1 className="spots-list-heading">Find your next vacation</h1>
            <div className="rent-button-container">
                <button className="rent-button" onClick={scrollToForm}>
                    Rent out your home for logged in users
                </button>
            </div>
            <div className="spot-list-arrange">
                {spotsArr.map(spot => (
                    <SpotCard key={spot.id} spot={spot}></SpotCard>
                ))}
            </div>

            <section id="form-section">
                {/* Your form component goes here */}
            </section>
        </section>
    );
}

export default SpotsList;
