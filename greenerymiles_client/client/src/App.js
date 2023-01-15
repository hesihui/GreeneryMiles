import React, { Component, Fragment } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow, Circle } from 'google-maps-react';
import jsondata from './housedata.json';

const mapStyleRef = {
  width: '100%',
  height: '100%',
  position: 'absolute'
};

const cityCircle = new google.maps.Circle({
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  map,
  center: citymap[city].center,
  radius: Math.sqrt(citymap[city].population) * 100,
});


export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,  // Hides or shows the InfoWindow
      activeMarker: {},          // Shows the active marker upon click
      selectedPlace: {},          // Shows the InfoWindow to the selected place upon a marker
      stores: [{latitude: jsondata.data[1].lat, longitude: jsondata.data[1].lng, addresses:jsondata.data[1].address, price:jsondata.data[1].price},
        {latitude: jsondata.data[2].lat, longitude: jsondata.data[2].lng, addresses:jsondata.data[2].address, price:jsondata.data[2].price},
        {latitude: jsondata.data[3].lat, longitude: jsondata.data[3].lng, addresses:jsondata.data[3].address, price:jsondata.data[3].price},
        {latitude: jsondata.data[4].lat, longitude: jsondata.data[4].lng, addresses:jsondata.data[4].address, price:jsondata.data[4].price},
        {latitude: jsondata.data[5].lat, longitude: jsondata.data[5].lng, addresses:jsondata.data[5].address, price:jsondata.data[5].price},
        {latitude: jsondata.data[6].lat, longitude: jsondata.data[6].lng, addresses:jsondata.data[6].address, price:jsondata.data[6].price}]
    };
  }

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};

displayMarkers = () => {
  return this.state.stores.map((store, index) => {
    return <Marker key={index} id={index} position={{
     lat: store.latitude,
     lng: store.longitude
   }} name={[store.addresses, " Price: ", store.price]}
   onClick={this.onMarkerClick} />
  })
}

  render() {
    return (
        <Map
          google={this.props.google}
          zoom={15}
          style={mapStyleRef}
          initialCenter={{ lat: jsondata.data[0].lat, lng: jsondata.data[0].lng}}

        >
          <Fragment>
            <Circle
            defaultCenter={{ lat: jsondata.data[0].lat, lng: jsondata.data[0].lng}}
            radius={10000}
            style={circleStyle}
          />
          </Fragment>
          {this.displayMarkers()}
          <Marker
          onClick={this.onMarkerClick}
          name={[jsondata.data[0].address, " Price: ", jsondata.data[0].price]}
          
        />
         
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyDsB764Ax1QjNFQ2_rSbwDaPJLlU81JBYc'
})(App);