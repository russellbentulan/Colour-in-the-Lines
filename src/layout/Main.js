import React, { Component } from "react";
import Form from "./Form";
import PalettesSelection from "../components/PalettesSelection";
import axios from "axios";
import Qs from "qs";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      didFormSubmit: false,
      allPalettesArray: [],
      colorSelection: null,
      keyWordsArray: []
    };
  }

  // Display all of the information to the user
  setPalettes = (data, keywords) => {

    const keyWordsAndSynonyms = keywords.map(word => {
      return axios({
        method: "get",
        url: "https://proxy.hackeryou.com",
        dataResponse: "json",
        paramsSerializer: function(params) {
          return Qs.stringify(params, { arrayFormat: "brackets" });
        },
        params: {
          reqUrl: `${process.env.REACT_APP_API_ENDPOINT_2}${word}/json`
        }
      });
    })

    axios
      .all(keyWordsAndSynonyms)
      .then(axios.spread((response) => {
        const allKeyWordsAndSynonyms = [
          ...response.data.noun.syn,
          response.data.verb.syn
        ];

        if (allKeyWordsAndSynonyms.length) {
          this.setState({
            didFormSubmit: true,
            allPalettesArray: data,
            keyWordsArray: allKeyWordsAndSynonyms
          });
        } else {
          this.setState({
            didFormSubmit: true,
            allPalettesArray: data,
            keyWordsArray: []
          });
        }
      }))
      .catch(() => {
        // These colour descriptions aren't too important to the app
        // Push the other data over to the results instead
        this.setState({
          didFormSubmit: true,
          allPalettesArray: data,
          keyWordsArray: []
        });
      });
  };

  // Rerender when a colour has been chosen
  handleColourChoice = colour => {
    this.setState({
      colorSelection: colour
    });
  };

  render() {
    const { didFormSubmit, allPalettesArray } = this.state;

    return (
      <main className="flexGrid wrapper">
        <Form
          dataHandler={this.setPalettes}
          formFocusListener={this.props.formFocusListener}
          textBackground={this.state.colorSelection}
        />

        {didFormSubmit ? (
          <PalettesSelection
            palettesArray={allPalettesArray}
            colourButtonListener={this.handleColourChoice}
            keyWordsArray={this.state.keyWordsArray}
          />
        ) : null}
      </main>
    );
  }
}

export default Main;
