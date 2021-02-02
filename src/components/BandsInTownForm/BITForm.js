import React, { useState } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../../services/StorageService/useLocalStorage";
import {  strSanitize } from "../../utils";

const BITForm = props => {
  const [artistNameCached, setArtistNameCached] = useLocalStorage('artist');
  const [artistName, setArtistName] = useState(artistNameCached || "");
  const [isEnabled, setIsEnabled] = useState(true);

  async function onSubmit(event) {
    event.preventDefault();

    setIsEnabled(false);

    const sanitizedArtistName = strSanitize(artistName);

    setArtistName(sanitizedArtistName);

    setArtistNameCached(artistName);

    try {
      await props.onSubmit(artistName);
    } finally {
      setIsEnabled(true);
    }
  }

  return (
    <section className="topnav">
      <form onSubmit={onSubmit}>
        <input
            type="text"
            name="query"
            placeholder="Search an artist"
            id="form-input"
            className="Searchbox"
            autoComplete="off"
            disabled={!isEnabled}
            onChange={event => setArtistName(event.target.value)}
          /> <button type="submit" disabled={!isEnabled}>
            {isEnabled ? "Search" : "Searching..."}
          </button>
        
      </form>
    </section>
  );
};

BITForm.propTypes = {
  setArtist: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default BITForm;
