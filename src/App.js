import React from "react"
import Titles from "./components/Titles"
import Form from "./components/Form"
import Weather from "./components/Weather"


const API_KEY = "82e09759d7c354f06afff050d20cc9fd";
class App extends React.Component {
  state = {
    temperature: undefined,
    humidity : undefined,
    error : undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
    const data = await api_call.json();
    console.log(data);
    if(city && country){ 
      this.setState({
        temperature: data.main.temp,
        humidity : data.main.humidity,
        error : ""
      })
    }
    else {
       this.setState({
        temperature: undefined,
        humidity : undefined,
        error : "Please enter city and country"
       });
    }
  }
  //http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=82e09759d7c354f06afff050d20cc9fd&units=metric
  render () {
    return (
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                 <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather data={this.state}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
     
  }
}

export default App

