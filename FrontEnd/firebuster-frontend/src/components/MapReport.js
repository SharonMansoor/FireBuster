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
        onClick={this.props.handleMapClick}
      >
       {this.props.location &&
       <Marker
       position={this.props.location}
       onClick={this.onMarkerClick}
       icon="..\images\fireAlert.png"
       />
       }
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB4IStStyLDcP9IHaw970bVjwJYehw5O78",
})(MapReport);
