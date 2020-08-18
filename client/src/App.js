import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './API'

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 21.0270843,
    longitude: 105.7678782,
    zoom: 5 
  });
  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    console.log(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/cuongvomanh/ckdwu6mfy3goa19pgyc7g5lps"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
    >
      {
        logEntries.map(entry => (
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
          >
            <div>{entry.title}</div>
            <div>
              <img 
                className="marker" 
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`
                }}
                src="https://i.imgur.com/y0G5YTX.png" 
                alt="marker"
              />
            </div>
          </Marker>
        ))
      }
      <Popup
        latitude={37.78}
        longitude={-122.41}
        closeButton={true}
        closeOnClick={false}
        onClose={() => this.setState({showPopup: false})}
        anchor="top" >
        <div>You are here</div>
      </Popup>
    </ReactMapGL>
  );
}
export default App;
