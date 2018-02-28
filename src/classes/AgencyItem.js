export default class AgencyItem {
  // this.lat = data.geometry.location.lat;
  // this.lng = data.geometry.location.lng;
  constructor (data) {
    this.location = data.geometry.location
    this.id = data.id;
    this.name = data.name;
    //opening_hours = { "open_now" : false, "weekday_text" : [] }
    this.opening_hours = data.opening_hours;
    this.vicinity = data.vicinity;
    this.rating = data.rating;
    this.d2a = 0;
    this.d2b = 0;
  }

  getDistance = () => {
    return Number.parseFloat(this.d2a) + Number.parseFloat(this.d2b);
  }
}
