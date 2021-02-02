import React from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../../services/StorageService/useLocalStorage";
import "./BITResultsEvent.css";
import { FaRegHeart } from "react-icons/fa";

let fav = [];
const BITResultsEvent = (props) => {
  const [favorites, setFavorites] = useLocalStorage('favorites');
  const addToFavorites = (item) => {
    const data = `Venue: ${item.name}, City: ${item.city}, Country: ${item.country}`
    fav.push(data)
    setFavorites(fav)
    console.log(favorites)
  }
  return (
    <div className="event-box">
      <div className="top">
        <div className="boxHeader">
          <h3>EVENT DETAILS</h3>
          <div className="favorites" onClick={() => addToFavorites(props.event.venue)}>
            <div className="button-div">
              {" "}
              <button className="fav-button">
                {" "}
                <FaRegHeart /> <span>{" "} Favorites</span>
              </button>{" "}
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="bottom">
          <div className="eventColumn-left">
            <div className="event-name">
              <p className="eventHeaders">
                <strong>Venue</strong>
              </p>
              <p className="eventInfo">{props.event.venue.name}</p>
            </div>
            <div className="event-country">
              <p className="eventHeaders">
                <strong>Country</strong>
              </p>
              <p className="eventInfo">{props.event.venue.country}</p>
            </div>
          </div>
          <div className="eventColumn-right">
            <div className="event-city">
              <p className="eventHeaders">
                <strong>City</strong>
              </p>
              <p className="eventInfo">{props.event.venue.city}</p>
            </div>
            <div className="event-date">
              <p className="eventHeaders">
                <strong>Date</strong>
              </p>
              <p className="eventInfo">
                <span>{props.event.date}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BITResultsEvent.propTypes = {
  event: PropTypes.object.isRequired,
};

export default BITResultsEvent;
