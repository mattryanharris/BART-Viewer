import './App.css';
import React, { Component } from 'react';

class Train extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      abbreviation : props.abbreviation,
      name: props.name
    };
  }

  componentDidMount() {
  fetch("http://api.bart.gov/api/etd.aspx?cmd=etd&key=MW9S-E7SL-26DU-VV8V&orig="+ this.state.abbreviation + "&json=y")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.root
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (

        <div className="card">
  <div className="card-body">
    <h5 className="card-title">{this.state.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{this.state.items.station[0].etd[0].destination}</h6>
    <p className="card-text">ETA: {this.state.items.station[0].etd[0].estimate[0].minutes} minutes</p>

  </div>
</div>

      
      );
    }
  }
}

class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
      abbreviations:[
      {name: "12th St. Oakland City Center", abbreviation: "12th"},
      {name: "16th St Mission (SF)", abbreviation:"16th"},
      {name: "19th St. Oakland", abbreviation:"19th"},
      {name: "24th St. Mission (SF)", abbreviation:"24th"},
      {name: "Ashby (Berkeley)", abbreviation:"ashb"},
      {name: "Balboa Park (SF)", abbreviation:"balb"},
      {name: "Bay Fair (SF)", abbreviation:"bayf"},
      {name: "Castro Valley", abbreviation:"cast"},
      {name: "Civic Center", abbreviation:"civc"},
      {name: "Coliseum", abbreviation:"colm"},
      {name: "Concord", abbreviation:"conc"},
      {name: "Daly City", abbreviation:"daly"},
      {name: "Downtown Berkeley", abbreviation:"dbrk"},
      {name: "Dublin/Pleasonton", abbreviation:"dubl"},
      {name: "El Cerrito del Norte", abbreviation:"deln"},
      {name: "El Cerrito Plaza", abbreviation:"plza"},
      {name: "Embarcedero", abbreviation:"embr"},
      {name: "Fremont", abbreviation:"frmt"},
      {name: "Fruitvake", abbreviation:"ftvl"},
      {name: "Glen Park (SF)", abbreviation:"glen"},
      {name: "Hayward", abbreviation:"hayw"},
      {name: "Lafeyette", abbreviation:"lafy"},
      {name: "Lake Merritt (Oakland)", abbreviation:"lake"},
      {name: "MacArthur (Oakland)", abbreviation:"mcar"},
      {name: "Milbrae", abbreviation:"mlbr"},
      {name: "Mongtomgery St (SF)", abbreviation:"colm"},
      {name: "North Berkeley", abbreviation:"nbrk"},
      {name: "North Concord", abbreviation:"ncon"},
      {name: "Orinda", abbreviation:"orin"},
      {name: "Pittsburg/Baypoint", abbreviation:"pitt"},
      {name: "Pleasant Hill", abbreviation:"phil"},
      {name: "Powell St. (SF)", abbreviation:"powl"},
      {name: "Richmond", abbreviation:"rich"},
      {name: "Rockridge (Oakland)", abbreviation:"rock"},
      {name: "San Bruno", abbreviation:"sbrn"},
      {name: "San Francisco International", abbreviation:"sfia"},
      {name: "San Leandro", abbreviation:"sanl"},
      {name: "South Hayward", abbreviation:"shay"},
      {name: "South San Francisco", abbreviation:"ssan"},
      {name: "Union City", abbreviation:"ucty"},
      {name: "Warm Springs/South Fremont", abbreviation:"warm"},
      {name: "Walnut Creek", abbreviation:"wcrk"},
      {name: "West Oakland", abbreviation:"woak"}]
    }
  }

  render() {
  return (
    <div id="root">
    {this.state.abbreviations.map(function(station, index) {
               return (
                 <Train
                   abbreviation={station.abbreviation}
                   name={station.name}
                 />
               );
             }.bind(this))}
    </div>
    );
}
}


export default App;
