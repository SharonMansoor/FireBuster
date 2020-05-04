import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapAlerts extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={11}
        initialCenter={{
          lat: this.props.alerts[0].locationLAT,
          lng: this.props.alerts[0].locationLG,
        }}
      >
        {this.props.alerts.map((alert) => (
          <Marker
            position={{ lat: alert.locationLAT, lng: alert.locationLG }}
            onClick={this.onMarkerClick}
          />
        ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB4IStStyLDcP9IHaw970bVjwJYehw5O78",
})(MapAlerts);
