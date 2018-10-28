import React, { Component } from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import Slider from 'react-slick';
import '../node_modules/slick-carousel/slick/slick-theme.css';
import '../node_modules/slick-carousel/slick/slick.css'; 

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';

import Terrain from './image/terrain.svg';
import LocationFabImage from './image/my_location.svg';
import BingLogo from './image/bing_logo.svg';
import ArrowDown from './image/arrow_down_2.svg';
import Car from './image/car.svg';
import Parking from './image/parking.svg';
import Restaurant from './image/restaurant.svg';
import Subway from './image/subway.svg';
import fs from 'fs';
import './App.css';

var arr = require('./Location.json');

class App extends Component {
  constructor(props) {
    super(props);

    this.counter = 1;
    this.d = {}

    this.state = {
      check: false,
      slideIndex: 0,
      updateCount: 0,
      // color: 'red',
      mapTypeId: 'road',
      isVisible : false,
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
      directions: this.d,
      colorZero: "secondary",
      colorOne: "default",
      colorTwo: "default",
      colorThree: "default",
      slideIndex: 0,
      mapOptions: {
          showDashboard: false
      }
    }

    this.changeState = this.changeState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.RequestHandler = this.RequestHandler.bind(this);
  }
  
  changeState(){
    
    var str = document.getElementById("inputBase").value

    if(this.counter === 0){
        this.d = {};
        this.counter = 1;
        console.log(this.d);
        this.setState({isVisible: false,
          mapOptions:{
            showDashboard: false
          }
        });
      }else{
        this.d = {
          "inputPanel": "inputPanel",
          "renderOptions": {"itineraryContainer": "printoutPanel" },
          "requestOptions": {"routeMode": "driving", "maxRoutes": 2},
          "wayPoints": [{address: str}, {}],
        };
        this.counter = 0;
        console.log(this.d);
        this.setState({isVisible: true,
          mapOptions:{
            showDashboard: false
          }
        });
      }

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
      directions: this.d,
      mapOptions: {
        showDashboard: false
      }
    })
    this.handleSubmit();
  }

  handleSubmit(event){

    console.log("in submit");
    
    console.log(this.state.searchInput);
    console.log(str);
    // console.log(this.state.boundary.location[0]);
    // console.log(this.state.boundary.location[1]);

    var str = document.getElementById("inputBase").value
    console.log(str)
    if(str !== null && str !== ""){
      this.setState({
        boundary: {
          "search" : str,
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
        // searchInput: str
      })
    }


    // event.preventDefault();
    // if(this.state.searchInput !== null && this.state.searchInput !== ""){
    //   this.setState({
    //     boundary: {
    //       "search" : this.state.searchInput,
    //       "polygonStyle" :{
    //         fillColor: 'rgba(161,224,255,0.4)',
    //         strokeColor: '#a495b2',
    //         strokeThickness: 2
    //       },
    //       "option":{
    //         entityType: 'PopulatedPlace'
    //       }
    //     },
    //     mapOptions: {
    //       showDashboard: false
    //     }
    //   })
    // }
    // event.preventDefault();
  }

  GetLocationHandled(location){
    if(this.state.check == true){
      this.setState({
        getLocationHandledData: JSON.stringify(location)
      });
      var obj = JSON.parse(this.state.getLocationHandledData);

      for (var i in arr){
        if(arr[i].lat - obj.latitude >= -2 && arr[i].lat - obj.latitude <= 2){
          this.setState({
            pushPins: [
              ...this.state.pushPins,
              {
                "location":[arr[i].lat, arr[i].lng], "option":{color: 'red'}, "addHandler": {"type" : "click", callback: this.callBackMethod }
              }
            ]
          });
        }
      }
    }
  }
  GetEventHandled(callbackData){
    console.log(callbackData);
  }

  RequestHandler(e){
    if(this.state.check == false){
      this.setState({
        check: true
      });
    }else{
      this.setState({
        check: false,
        pushPins:[
          {

          }
        ]
      });
    }
  }

  pushPinsCrash(){
    this.setState({
        check: false
    });
  }

  changeTerrianHandler(){
      if(this.state.mapTypeId === "road"){
          this.setState({
            mapTypeId : "aerial"
          });
      }else{
        this.setState({
            mapTypeId: "road"
        });
      }
  }  
  render() {
    var settings = {
        className: "CarouselContainer",
        centerMode: true,
        centerPadding: '4px',
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        slidesPerRow: 1,
        // afterChange: () => this.setState(state => ({
        //     //updateCount: state.updateCount + 1,
        // })),
        // beforeChange: (current, next) => {
        //     this.setState({
        //         slideIndex: next
        //     });
        //     console.log(this.state.slideIndex);
        //     if(this.state.slideIndex%4 === 0){
                
        //         this.setState({
        //             colorZero: 'secondary',
        //             colorOne: 'default',
        //             colorTwo: 'default',
        //             colorThree: 'default'
        //         });
        //     }else if(this.state.slideIndex%4 === 1){
        //         this.setState({
        //             colorZero: 'default',
        //             colorOne: 'secondary',
        //             colorTwo: 'default',
        //             colorThree: 'default'
        //         });
        //     }else if(this.state.slideIndex%4===2){
        //         this.setState({
        //             colorZero: 'default',
        //             colorOne: 'default',
        //             colorTwo: 'secondary',
        //             colorThree: 'default'
        //         });
        //     }else{
        //         this.setState({
        //             colorZero: 'default',
        //             colorOne: 'default',
        //             colorTwo: 'default',
        //             colorThree: 'secondary'
        //         });
        //     }
            
        // }
    };

    return (
      <div>
        <div class="map-one">
            <div >
            <AppBar style={styles.AppBarContainer}>
                <Toolbar style={styles.Toolbar}>
                    {/* <Button onClick={this.handleSubmit.bind(this)} style={styles.LayerButton}></Button> */}
                    <InputBase id="inputBase" style={styles.SearchBarContainer} placeholder="Input Destination" />
                    <Button onClick={this.changeState.bind(this)} style={styles.BingButton}></Button>
                </Toolbar>
                <Button variant="fab" style={styles.LayerButton} onClick={this.changeTerrianHandler.bind(this)}></Button>
                {/* <IconButton className={classes.button}>
                    <Terrain />
                </IconButton> */}
            </AppBar>
            </div>

            <ReactBingmaps
            id = "nine" 
            className = "customClass"
            center = {[37.762, -122.43]}
            mapTypeId = {this.state.mapTypeId}
            bingmapKey = {this.state.bingmapKey}
            mapOptions = {this.state.mapOptions}
            directions = {this.state.directions}
            boundary = {this.state.boundary}
            pushPins = {this.state.pushPins}
            getLocation = {
              {
                addHandler: "click", callback: this.GetLocationHandled.bind(this)
              }
            }
            >
            </ReactBingmaps>
            
            {/* <Button variant="fab" style={styles.MyLocationContainer}></Button> */}
            <Slider {...settings} >
                <div align="center">
                    <Button variant="fab" 
                        style={styles.CarouselFour} color={this.state.colorThree}></Button>
                    {/* <Input 
                        onChange={e => this.slider.slideGoTo(e.target.value)}
                        value={this.state.slideIndex}
                        textColor= 'red'
                    /> */}
                </div>
                <div align="center">
                    <Button variant="fab" style={styles.CarouselLeft}></Button> 
                </div>
                <div align="center">
                    <Button variant="fab" style={styles.CarouselMid}></Button>
                </div>
                <div align="center">
                    <Button variant="fab" onClick={this.RequestHandler} style={styles.CarouselRight}></Button>
                </div>
            </Slider>

            {this.state.isVisible && <div className="direction-container" style={styles.DirectrionContainer}>
                <div className="input-panel" id='inputPanel' ></div>
                <div className="itinerary-container" id='itineraryContainer'></div>
                <div id='printoutPanel'></div>
                <Button onClick={()=>{this.setState({isVisible:!this.state.isVisible})}} style={styles.HideButton}>
                {/* {this.state.isVisible ? "V" : "Show"} */}
                </Button>
            </div>}
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
    },

    AppBarContainer: {
        backgroundColor: 'transparent',
        color: '#3B8283',
        boxShadow: '0px 0px 0px',
        paddingTop: 10
    },

    LayerButton: {
        backgroundImage: `url(${Terrain})`,
        backgroundColor: '#3B8283',
        opacity: 0.8,
        width: 40,
        height: 40,
        left: '86vw',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
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
    },

    BingButton: {
        backgroundImage: `url(${BingLogo})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '70% 50%',
        backgroundSize: '35%',
        backgroundColor: '#FFFFFF',
        opacity: 0.8,
        borderRadius: 0
    },

    CarouselFour: {
        backgroundImage: `url(${Subway})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        boxShadow: '0px 0px 0px',
        backgroundColor: '#178585',
        // margin: '0 auto',
        // marginRight: 'auto'
        // position:'absolute',
        // bottom:80,
        // left: 150
    },

    CarouselLeft: {
        backgroundImage: `url(${Car})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', 
        boxShadow: '0px 0px 0px',
        backgroundColor: '#408A75',
        // position:'absolute',
        // bottom:80,
        // left: 100
    },

    CarouselRight: {
        backgroundImage: `url(${Parking})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        boxShadow: '0px 0px 0px',
        backgroundColor: '#96B3AD',
        // position:'absolute',
        // bottom:80,
        // left: 200
    },

    CarouselMid: {
        backgroundImage: `url(${Restaurant})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        boxShadow: '0px 0px 0px',
        backgroundColor: '#A7E8DE'
    },

    DirectrionContainer: {
        position:'absolute',
        bottom:0,
        width: '100%',
        backgroundColor: '#FFFFFF',
    },

    HideButton: {
        backgroundImage: `url(${ArrowDown})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        opacity: 0.5,
        position:'absolute',
        bottom:13,
        width: '50%'
        // align: 'center'
    }
}

export default App;