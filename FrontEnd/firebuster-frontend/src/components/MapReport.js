import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapReport extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={11}
        initialCenter={{
          lat: 32.736029,
          lng: 35.058554,
        }}
      >
       
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB4IStStyLDcP9IHaw970bVjwJYehw5O78",
})(MapReport);
