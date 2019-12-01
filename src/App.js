import React, { Component } from "react";
import axios from "axios";
import Qs from "qs";

import Header from "./Header";
import Form from "./Form";

import "./styles/App.scss";
import PalettesList from "./PalettesList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      coloursBaseUrl: 'http://www.colourlovers.com/api/palettes',
      coloursQuery:'',
      coloursAvailable: [],
      formSubmitted: false
    };
  }

  textChange = (e) => {
    this.setState({
      coloursQuery: e.target.value
    });
  }

  formSubmit = (e) => {
    e.preventDefault();

    axios({
        method: "get",
        url: "https://proxy.hackeryou.com",
        dataResponse: "json",
        paramsSerializer: function(params) {
          return Qs.stringify(params, { arrayFormat: "brackets" });
        },
        params: {
          reqUrl: "http://www.colourlovers.com/api/palettes",
          params: {
            keywords: this.state.coloursQuery,
            numResults: 10,
            format: "json"
          }
        }
      }).then(res => {
        console.log(res.data);
        this.setState({
          coloursAvailable: res.data,
          formSubmitted: true
        });
      });
  }

  render() {
    return (
      <div>
        <Header />

        <main>
          <section className="userInput">
            <Form
              formHandler={this.formSubmit}
              textHandler={this.textChange}
            />
          </section>

          {this.state.formSubmitted 
            ?
          <PalettesList coloursArray={this.state.coloursAvailable}/>
            :
          null}
          
        </main>
      </div>
    );
  }
}

export default App;