import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [movedToTop, setMovedToTop] = useState(false); // New state to track whether search has moved to top
  const [key, setKey] = useState(process.env.REACT_APP_API_KEY)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${key}`;

  const searchLocation = (event) => {

    if (event.key === 'Enter') {

      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })

      setLocation('');
      setKey(process.env.REACT_APP_API_KEY);
      setMovedToTop(true); // Set movedToTop to true when Enter key is pressed

    }

  }
  return (
    <div className="app">
      <div className={`search ${movedToTop ? 'top' : 'middle'}`}> {/* Conditionally apply 'top' or 'middle' class */}
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">

          <div className="location">
            <p>{data.name}</p>




          </div>
          <div className="temp">

            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description} </p> : null}



          </div>
        </div>
        {data.name != undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>

            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity.toFixed()}%</p> : null}
              <p>Humidity</p>

            </div>

            <div className="wind">
              {data.main ? <p className="bold">{data.wind.speed.toFixed()} m/s</p> : null}
              <p>Wind Speed</p>


            </div>


          </div>
        }
        {data.name != undefined &&
          <div className="bottom">

            <div className="humidity">
              {data.main ? <p className="bold">{data.main.temp_min}°C</p> : null}
              <p>Low</p>

            </div>

            <div className="wind">
              {data.main ? <p className="bold">{data.main.temp_max.toFixed()} °C</p> : null}
              <p>High</p>


            </div>


          </div>
        }

        {data.name != undefined &&
          <div className="bottom">

            <div className="humidity">
              {data.main ? <p className="bold">{data.coord.lon}</p> : null}
              <p>Longitude</p>

            </div>

            <div className="wind">
              {data.main ? <p className="bold">{data.coord.lat}</p> : null}
              <p>Latitude</p>


            </div>


          </div>
        }
      </div>
    </div>
  );
}

export default App;
