// reference: https://www.movable-type.co.uk/scripts/latlong.html

const EARTH_RADIUS_MILES = 3958.7613;

  // based on great circle
export function getDistance(p1, p2) {
    var R = EARTH_RADIUS_MILES; // miles
    var φ1 = toRadians(p1.lat);
    var φ2 = toRadians(p2.lat);
    var Δφ = toRadians(p2.lat - p1.lat);
    var Δλ = toRadians((p2.lng-p1.lng));

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    return d.toPrecision(5);
  }

  // To Radius
const toRadians = (x) => {
    return x * Math.PI / 180.0;
}
