import WeatherSearch from "./components/WeatherSearch";
import TheFooter from "./components/TheFooter";

import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <h1>Eguraldi App</h1>
        <WeatherSearch />
        <TheFooter />
      </div>
    </>
  );
}

export default App;
