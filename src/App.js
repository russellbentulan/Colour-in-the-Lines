import React, { Component } from "react";
import Qs from "qs";
import axios from "axios";

import Header from "./Header";
import Form from "./Form";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      coloursBaseUrl: 'http://www.colourlovers.com/api/palettes',
      coloursQuery:'',
      coloursAvailable: []
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
            orderCol: "numVotes",
            format: "json"
          }
        }
      }).then(res => {
        console.log(res.data);
        this.setState({
          coloursAvailable: res.data
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
              textareaHandler={this.textChange}
            />
          </section>

          {/* WIP */}
          <section className="palette">
            {this.state.coloursAvailable.length ? (
              <ul className="palette__list">
                {this.state.coloursAvailable.map(palette => (
                  <li key={palette.id}>{palette.title}</li>
                ))}
              </ul>
            ) : (
              <p>Sorry, we couldn't find anything for your search.</p>
            )}
          </section>
        </main>
      </div>
    );
  }
}

export default App;