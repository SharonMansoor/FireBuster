import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, Polygon } from "google-maps-react";

const defaultLocation = {
  lat: 39.806609,
  lng: -98.340494,
};

export class MapReport extends Component {
  calcLat = (lat) => {
    return parseFloat(lat) + (1 / 111) * 2.5;
  };

  calcLat2 = (lat) => {
    return parseFloat(lat) - (1 / 111) * 2.5;
  };

  render() {
    return (
      <div style={{ height: "calc(100vh - 64px)", position: "relative" }}>
        <Map
          google={this.props.google}
          zoom={5}
          initialCenter={defaultLocation}
          onClick={this.props.handleMapClick}
        >
          {this.props.location && (
            <Marker
              position={this.props.location}
              icon="..\images\fireAlert.png"
            />
          )}
          {this.props.location && (
            <Polygon
              key={this.props.id}
              paths={[
                {
                  lat: this.calcLat(this.props.location.lat),
                  lng: this.calcLat(this.props.location.lng),
                },
                {
                  lat: this.calcLat(this.props.location.lat),
                  lng: this.calcLat2(this.props.location.lng),
                },
                {
                  lat: this.calcLat2(this.props.location.lat),
                  lng: this.calcLat2(this.props.location.lng),
                },
                {
                  lat: this.calcLat2(this.props.location.lat),
                  lng: this.calcLat(this.props.location.lng),
                },
              ]}
              strokeColor="#ff1900"
              strokeOpacity={0.8}
              strokeWeight={2}
              fillColor="#ff1900"
              fillOpacity={0.35}
            />
          )}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB4IStStyLDcP9IHaw970bVjwJYehw5O78",
})(MapReport);
