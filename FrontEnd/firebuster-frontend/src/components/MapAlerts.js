import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, Polygon } from "google-maps-react";

const defaultLocation = {
  lat: 39.806609,
  lng: -98.340494,
};

export class MapAlerts extends Component {
  calcLat = (lat) => {
    return parseFloat(lat) + (1 / 111) * 2.5;
  };

  calcLat2 = (lat) => {
    return parseFloat(lat) - (1 / 111) * 2.5;
  };

  render() {
    return (
      <div style={{ height: "calc(100vh - 64px)", position: "relative" }}>
        {!this.props.isFetching ? (
          <Map
            google={this.props.google}
            zoom={this.props.currAlert ? 10 : 5}
            initialCenter={
              this.props.currAlert
                ? this.props.currAlert.location
                : defaultLocation
            }
            center={
              this.props.currAlert
                ? this.props.currAlert.location
                : defaultLocation
            }
          >
            {this.props.alerts.map((alert) => (
              <Polygon
                key={alert._id}
                paths={[
                  {
                    lat: this.calcLat(alert.location.lat),
                    lng: this.calcLat(alert.location.lng),
                  },
                  {
                    lat: this.calcLat(alert.location.lat),
                    lng: this.calcLat2(alert.location.lng),
                  },
                  {
                    lat: this.calcLat2(alert.location.lat),
                    lng: this.calcLat2(alert.location.lng),
                  },
                  {
                    lat: this.calcLat2(alert.location.lat),
                    lng: this.calcLat(alert.location.lng),
                  },
                ]}
                strokeColor="#ff1900"
                strokeOpacity={0.8}
                strokeWeight={2}
                fillColor="#ff1900"
                fillOpacity={0.35}
              />
            ))}

            {this.props.alerts.map((alert) => (
              <Marker
                key={alert._id}
                position={alert.location}
                onClick={this.onMarkerClick}
                icon="..\images\fireAlert.png"
              />
            ))}
          </Map>
        ) : (
          "loading"
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB4IStStyLDcP9IHaw970bVjwJYehw5O78",
})(MapAlerts);
