import React from "react";
import PropTypes from 'prop-types';
import { BITResultsEvent } from "..";
import "./BITResults.css";

const BITResults = props => {
  if (props.hasError) {
    return (
      <section className="bit-results">
        <p>There was an error retrieving the artist information.</p>
        <p>Please try again.</p>
      </section>
    );
  }
console.log(props)
  return Object.keys(props.artist).length ? (
    <div className="artistTop">
      <div className="artist-container">
        <div className="result-box">
          <div className="column-left">
            <img
              className="photo"
              src={props.artist.image_url}
              alt={props.artist.name}
            />
          </div>
          <div className="column-right">
            <p className="name">{props.artist.name}</p>
            <div className="totalEvents"><strong>upcoming events ({props.artist.events.length})</strong> </div>
            <p className="facebook">
              {props.artist.facebook_page_url ? (
                <a
                  href={props.artist.facebook_page_url}
                  className="bit-link"
                  title="Visit artist's Facebook page"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to Facebook Fanpage
                </a>
              ) : (
                <em>
                  This artist does not have a registered Facebook page yet.
                </em>
              )}
            </p>
          </div>
        </div>
          {props.artist.events.length ? (
            <div className="events-container">
                {props.artist.events.map((event) => (
                  <BITResultsEvent event={event} key={event.id} />
                ))}
            </div>
          ) : null}
      </div>
    </div>
  ) : (
    <section className="bit-results">
      <p>There's no information registered for this artist yet.</p>
    </section>
  );
};

BITResults.propTypes = {
  artist: PropTypes.shape().isRequired,
  hasError: PropTypes.bool.isRequired
};

export default BITResults;
