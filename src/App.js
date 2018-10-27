import React, { Component } from 'react';
import { ReactBingmaps } from 'react-bingmaps';
// import {Button} from "react-bootstrap";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import LayerIcon from './image/terrain.svg';
import LocationFabImage from './image/my_location.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible : true,
      bingmapKey: "Ah0FkX2Gv1-qefM-NeJQi18Mi0pUtir_s6CZacuUOiuQ-jMRg2jKQq08ex3UVoJ5",
      infoboxes : [
        {
          "location":[13.0827, 80.2707], "option":{ title: 'Chennai', description: '...' }, "addHandler": {"type" : "click", callback: this.callBackMethod}
        }
      ],
      pushPins : [
        {
          "location":[13.0827, 80.2707], "option":{ color: 'red' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
        }
      ],
      regularPolygons:[
        {
          "center":[13.0827, 80.2707],
          "radius":5,
          "points":36,
          "option": {fillColor: "rgba(0,0,0,0.5)", strokeThickness: 2}
        }
      ],
      infoboxesWithPushPins: [
        {
          "location":[13.0827, 80.2707], 
          "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
          "infoboxOption": { title: 'Infobox Title', description: 'Infobox' },
          "pushPinOption":{ title: 'Pushpin Title', description: 'Pushpin' },
          "infoboxAddHandler": {"type" : "click", callback: this.callBackMethod },
          "pushPinAddHandler": {"type" : "click", callback: this.callBackMethod }
        }
      ],
      boundary: {
        "location":['chennai'],
        "option":{
          entityType: 'PopulatedPlace'
        },
        "polygonStyle" :{
          fillColor: 'rgba(161,224,255,0.4)',
          strokeColor: '#a495b2',
          strokeThickness: 2
        }
      },
      searchInput: "",
      getLocationHandledData: "",
      directions: {
        "renderOptions": {"itineraryContainer": "itineraryContainer" },
        "requestOptions": {"routeMode": "driving", "maxRoutes": 2},
        "wayPoints": [
              {
                address: 'Chennai, Tamilnadu'
              },
              {
                address: 'Salem, Tamilnadu'
              }
            ]
      },
      mapOptions: {
          showDashboard: false
      }
    }
  }
  changeState(){
    this.setState({
      infoboxes : [
        {
          "location":[13.0827, 80.2707], "option":{ title: 'Chennai', description: 'Tamilnadu' }, "addHandler": {"type" : "click", callback: this.callBackMethod}
        }
      ],
      pushPins : [
        {
          "location":[13.0827, 80.2707], "option":{ color: 'yellow' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
        },
        {
          "location":[13.0727, 80.2707], "option":{ color: 'green' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
        }
      ],
      regularPolygons:[
        {
          "center":[13.0827, 80.2707],
          "radius":5,
          "points":6,
          "option": {fillColor: "rgba(0,0,0,0.5)", strokeThickness: 2}
        }
      ],
      infoboxesWithPushPins: [
        {
          "location":[13.0827, 80.2707], 
          "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
          "infoboxOption": { title: 'Chennai', description: 'Infobox' },
          "pushPinOption":{ title: 'Chennai', description: 'Pushpin' },
          "infoboxAddHandler": {"type" : "click", callback: this.callBackMethod },
          "pushPinAddHandler": {"type" : "click", callback: this.callBackMethod }
        }
      ],
      boundary: {
        "search" : "636303",
        "polygonStyle" :{
          fillColor: 'rgba(161,224,255,0.4)',
          strokeColor: '#a495b2',
          strokeThickness: 2
        },
        "option":{
          entityType: 'PopulatedPlace'
        }
      },
      polyline: {
        "location": [[13.0827, 80.2707],[13.0527, 80.2707]],
        "option": { strokeColor: 'red', strokeThickness: 10, strokeDashArray: [1, 2, 5, 10] }
      },
      directions: {
        "inputPanel": "inputPanel",
        "renderOptions": {"itineraryContainer": "itineraryContainer" },
        "requestOptions": {"routeMode": "driving", "maxRoutes": 2},
        "wayPoints": [
              {
                address: 'Chennai, Tamilnadu'
              },
              {
                address: 'Salem, Tamilnadu'
              },
              {
                address: 'Coimbatore, Tamilnadu'
              }
            ]
      },
      mapOptions: {
        showDashboard: false
      }
    })
  }
  handleSubmit(event){
    if(this.state.searchInput !== null && this.state.searchInput !== ""){
      this.setState({
        boundary: {
          "search" : this.state.searchInput,
          "polygonStyle" :{
            fillColor: 'rgba(161,224,255,0.4)',
            strokeColor: '#a495b2',
            strokeThickness: 2
          },
          "option":{
            entityType: 'PopulatedPlace'
          }
        },
        mapOptions: {
          showDashboard: false
        }
      })
    }
    event.preventDefault();
  }
  GetLocationHandled(location){
    this.setState({
      getLocationHandledData: JSON.stringify(location)
    });
  }
  GetEventHandled(callbackData){
    console.log(callbackData);
  }
  render() {
    return (
      <div>
        <div class="map-one">
            <div >
            <AppBar style={styles.AppBarContainer}>
                <Toolbar style={styles.Toolbar}>
                    <InputBase style={styles.SearchBarContainer} placeholder="Input Destination" />
                    <Button style={styles.LayerButton}></Button>
                </Toolbar>
            </AppBar>
            </div>

            <ReactBingmaps
            id = "nine" 
            className = "customClass"
            bingmapKey = {this.state.bingmapKey}
            mapOptions = {this.state.mapOptions}
            >
            </ReactBingmaps>
            <Button variant="fab" style={styles.MyLocationContainer}></Button>
        </div>   
      </div>
    );
  }
}

const styles = {
  MyLocationContainer: {
    backgroundImage: `url(${LocationFabImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position:'absolute',
    bottom:80,
    right:20
  },

  AppBarContainer: {
    backgroundColor: 'transparent',
    color: '#3B8283',
    boxShadow: '0px 0px 0px',
    paddingTop: 10
  },

  LayerButton: {
    backgroundColor: '#3B8283',
    opacity: 0.8,
    backgroundImage: `url(${LayerIcon})`,
    // backgroundSize: '10%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    // boxShadow: `0px 2px 0px #3B8283`,
    borderRadius: 0,
    border: 'solid #3B8283 2px',
    borderBottom: 0,
    padding: 8,
    width: 20
  },

  SearchBarContainer: {
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
    textColor: '#3B8283',
    // boxShadow: `0px 2px 0px #3B8283`,
    textAlign: 'center',
    paddingLeft: 12,
    width: '90%',
    height: '36px'
  }

}

export default App;