import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadSingleSpot, changeSpot } from '../../store/spots';
import { useEffect, useState } from 'react';

const EditSpotForm = () => {
  const { spotId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadSingleSpot(spotId));
  }, [dispatch, spotId]);

  const spot = useSelector((state) => state.spots[spotId]);

  const [address, setAddress] = useState(spot.address || '');
  const [city, setCity] = useState(spot.city || '');
  const [state, setState] = useState(spot.state || '');
  const [country, setCountry] = useState(spot.country || '');
  const [lat, setLat] = useState(spot.lat || '');
  const [lng, setLng] = useState(spot.lng || '');
  const [name, setName] = useState(spot.name || '');
  const [description, setDescription] = useState(spot.description || '');
  const [price, setPrice] = useState(spot.price || '');
  const [previewImage, setPreviewImage] = useState(spot.previewImage || '');

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateLat = (e) => setLat(e.target.value);
  const updateLng = (e) => setLng(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updatePreviewImage = (e) => setPreviewImage(e.target.value);

  useEffect(() => {
    dispatch(loadSingleSpot(spotId));
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    const payload = {
      spotId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage,
    };

    dispatch(changeSpot(payload)).then(() => {
      history.push(`/spots/${spotId}`);
    });
  };

  return (
    <form className="create-spot-form" onSubmit={submitHandler}>
      <h4>Edit</h4>
      <div>
        <label>Address:</label>
        <input type="text" value={address} required onChange={updateAddress} />
      </div>
      <div>
        <label>City:</label>
        <input type="text" value={city} required onChange={updateCity} />
      </div>
      <div>
        <label>State:</label>
        <input type="text" value={state} required onChange={updateState} />
      </div>
      <div>
        <label>Country:</label>
        <input type="text" value={country} required onChange={updateCountry} />
      </div>
      <div>
        <label>Lat:</label>
        <input type="number" value={lat} required onChange={updateLat} />
      </div>
      <div>
        <label>Lng:</label>
        <input type="number" value={lng} required onChange={updateLng} />
      </div>
      <div>
        <label>Name:</label>
        <input type="text" value={name} required onChange={updateName} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} required onChange={updateDescription} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} required onChange={updatePrice} />
      </div>
      <div>
        <label>Preview Image:</label>
        <input
          type="text"
          value={previewImage || ''}
          required
          onChange={updatePreviewImage}
        />
      </div>
      <button className="button">Submit</button>
    </form>
  );
};

export default EditSpotForm;
