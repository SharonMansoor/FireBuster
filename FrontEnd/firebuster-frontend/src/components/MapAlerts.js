import React, { Component } from "react";
import {
  Map,
  Marker,
  GoogleApiWrapper,
  Polygon,
} from "google-maps-react";

export class MapAlerts extends Component {
  calcLat = (lat) => {
    return parseFloat(lat) + (1 / 111) * 2.5;
  };

  calcLat2 = (lat) => {
    return parseFloat(lat) - (1 / 111) * 2.5;
  };

  render() {
    return (
      <div style={{height: 'calc(100vh - 64px)', position:'relative'}}>
      <Map
        google={this.props.google}
        zoom={11}
        initialCenter={this.props.currAlert.location}
        center={this.props.currAlert.location}
      >
        {this.props.alerts.map((alert) => (
          <Polygon
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
            position={{ lat: alert.location.lat, lng: alert.location.lng }}
            onClick={this.onMarkerClick}
            icon="..\images\fireAlert.png"
          />
        ))}
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB4IStStyLDcP9IHaw970bVjwJYehw5O78",
})(MapAlerts);
