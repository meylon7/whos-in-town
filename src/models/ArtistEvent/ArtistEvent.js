
class ArtistEvent {
  constructor(data) {
    this.id = data.id;
    this.date = new Date(data.datetime).toDateString();
    this.venue = {
      name: data.venue.name,
      city: data.venue.city,
      country: data.venue.country
    };
  }
}

export default ArtistEvent;
