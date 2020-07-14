import React, {Component} from "react";
import DateInput from "./components/DateInput.js";
import AstronomyCard from './components/Astronomy-Card.js';
import Photo from "./components/Photo.js";
import moment from "moment";
import momentRandom from "moment-random";
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';

class App extends Component {
  state = {
    date: moment(),
    photo: "",
    AstronomyCard: "",
    data:[]
  };

  componentDidMount() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY_YT}`).then(response => response.json()).then(json => this.setState({AstronomyCard: json}));
  }

  formatDate = moment => {
    let year = moment.year();
    let month = moment.month() + 1;
    let day = moment.date();
    return `${year}-${month}-${day}`;
  }

  changeDate = dateFromInput => {
    this.setState({date: dateFromInput});
    this.getAstronomyCard(this.formatDate(dateFromInput));
  };

  getAstronomyCard = date => {
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${process.env.REACT_APP_API_KEY_YT}`).then(response => response.json()).then(AstronomyCardData => this.setState({AstronomyCard: AstronomyCardData}));
  };

  handleClick = () => {
    let randomDate = momentRandom(moment(), moment("06-16-1995", "MM-DD-YYYY"));
    this.setState({date: randomDate});
    this.getAstronomyCard(this.formatDate(randomDate))
  };

  render() {
    return (
      <div>
      <Container class="jumbo" id="jumb">
        <Jumbotron class="jumbo01" id="jumb1">

          <h1 className="text-center">NASA's Astronomy Picture of the Day</h1>
        </Jumbotron>
      </Container>

      <DateInput changeDate={this.changeDate} date={this.state.date} handleClick={this.handleClick}/>

      <AstronomyCard data = {this.state.AstronomyCard}/>
    </div>
  );
  }

}

export default App;