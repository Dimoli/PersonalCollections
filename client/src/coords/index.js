let coords;

const success = (pos) => {
  const latitude = pos.coords.latitude;
  const longitude = pos.coords.longitude;
  const accuracy = pos.coords.accuracy;
  const speed = pos.coords.speed;

  coords = { latitude, longitude, accuracy, speed };
};
const error = () => {
  coords = "no coords";
};

const getCurrentPosition = () =>
  navigator.geolocation.getCurrentPosition(success, error);

export default () => {
  getCurrentPosition();

  return coords;
};
