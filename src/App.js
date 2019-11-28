import React, { Component } from 'react';
import Qs from 'qs';
import axios from 'axios';

import Header from './Header';

import './App.css';

class App extends Component {
  constructor() {
      super();
      this.state = {
        coloursBaseUrl: "http://www.colourlovers.com/api/palettes",
        coloursQuery: "in development",
        coloursResponse: []
      };
  }

  componentDidMount = () => {
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
          orderCol: 'numVotes',
          format: 'json'
        }
      }
    }).then(res => {
      console.log(res);
    });
  }

  render() {
    return(
      <div>

        <Header />

        <main>
          <section className="palette">
            <ul className="palette__list">

            </ul>
          </section>
        </main>

      </div>
    )
  }
}

export default App;
