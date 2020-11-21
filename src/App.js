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
      <p>{this.state.name} : {this.state.items.station[0].etd[0].destination} : {this.state.items.station[0].etd[0].estimate[0].minutes}</p>

      
      );
    }
  }
}

class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
      abbreviations:[{name: "Balboa", abbreviation:"balb"}, 
      {name: "San Francisco International", abbreviation:"sfia"},
      {name: "16th St and Mission", abbreviation:"16th"}]
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
