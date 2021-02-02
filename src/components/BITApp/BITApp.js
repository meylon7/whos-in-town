import React, { useState, useEffect } from "react";
import { ArtistInfo, ArtistEvent } from "../../models";
import useLocalStorage from "../../services/StorageService/useLocalStorage";
import { BITForm, BITResults } from "..";
import Modal from "../../services/Modal";
import "./BITApp.css";

const BASE_URL = "https://rest.bandsintown.com";
const APP_ID = "?app_id=foo";

async function getFromApi(artistName, getEvents = false) {
  try {
    const url = `${BASE_URL}/artists/${artistName}${
      getEvents ? "/events" : ""
    }${APP_ID}`;
    const response = await fetch(url, { mode: "cors" });

    if (response.ok) {
      return response.json();
    }

    console.error(response);
    throw new Error({ error: response.error });
  } catch (response) {
    console.error(response);
    throw new Error({ error: response.error });
  }
}

async function getArtistInfo(artistName) {
  let artistInfo = await getFromApi(artistName);

  artistInfo = new ArtistInfo(artistInfo);

  return artistInfo;
}

async function getArtistEvents(artistName) {
  let artistEvents = await getFromApi(artistName, true);

  artistEvents = artistEvents.map((el) => new ArtistEvent(el));

  return artistEvents;
}

const BITApp = () => {
  let result = []
  const [isOpen, setIsOpen] = useState(false);
  const [favorites] = useLocalStorage('favorites');
  const [artist, setArtist] = useState({});
  const [artistNameCached, setArtistNameCached] = useLocalStorage("artist");
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  const [hasError, setHasError] = useState(false);
 useEffect(()=>{
   console.log(favorites)
 })
  async function onSubmit(artistName) {
    let artist = {};
    let events = [];

    try {
      setHasError(false);
      [artist, events] = await Promise.all([
        getArtistInfo(artistName),
        getArtistEvents(artistName).catch((err) => err),
      ]);
      artist.events = events;
    } catch (error) {
      setHasError(true);
    }

    if (isFirstSearch) {
      setIsFirstSearch(false);
    }

    setArtistNameCached(artistName);
    setArtist(artist);
  }
  const onConfirm = (e) => {    
    setIsOpen(false);
  };
  const showFavorites = () => {
    if(favorites){
      result.push(JSON.parse(favorites))
    }
    setIsOpen(true);
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onConfirm={onConfirm}
        onClose={() => setIsOpen(false)}
        className="popup"
      >
        <h2>list of Favorites</h2>
        <ul>
          {favorites ? JSON.parse(favorites) : ''}
        </ul>
      </Modal>
      <BITForm setArtist={setArtist} onSubmit={onSubmit} />
      <button onClick={showFavorites} className="favorites_button">
      Favorites
          </button>
      <div>
        {!isFirstSearch && <BITResults artist={artist} hasError={hasError} />}
      </div>
    </div>
  );
};

export default BITApp;
