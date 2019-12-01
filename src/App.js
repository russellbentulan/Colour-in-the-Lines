import React, { Component } from "react";
import axios from "axios";
import Qs from "qs";

import MainTitle from "./components/MainTitle";
import Form from "./components/Form";

import "./styles/App.scss";
import PalettesList from "./features/PalettesList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      palettesQuery:'',
      palettesAvailable: [],

      didFormSubmit: false,
      formErrorMessage: ''
    };
  }

  setPalettesQueryState = (e) => {
    this.setState({
      palettesQuery: e.target.value
    });
  }

  getColourPalettes(textToQuery) {
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
          keywords: textToQuery,
          numResults: 10,
          format: "json"
        }
      }
    }).then(res => {
      console.log(res.data);
      // Display an error message if the returned array of data is empty
      if (res.data.length) {
        this.setState({
          palettesAvailable: res.data,
          didFormSubmit: true
        });
      } else {
        this.setState({
          formErrorMessage: "emptyPaletteList",
          didFormSubmit: true
        })
      }
    }).catch(err => {
      this.setState({
        formErrorMessage: err
      })
    });
  }

  // Submit the form if there is text in the input
  handleFormSubmit = (e) => {
    e.preventDefault();

    if (this.state.palettesQuery)
      this.getColourPalettes(this.state.palettesQuery);
    else {
      // Show an error message if the user submitted nothing
      this.setState({
        formErrorMessage: "emptyInput"
      })
    }
  }

  render() {
    const {
      formErrorMessage,
      didFormSubmit,
      palettesAvailable,
      palettesQuery
    } = this.state;
    
    return (
      <div>

        <main>
          <MainTitle />

          <Form
            formHandler={this.handleFormSubmit}
            textHandler={this.setPalettesQueryState}
            errorMessage={formErrorMessage}
            inputVal={palettesQuery}
          />

          { didFormSubmit 
            ? <PalettesList coloursArray={palettesAvailable}/>
            : null 
          }

        </main>
      </div>
    );
  }
}

export default App;