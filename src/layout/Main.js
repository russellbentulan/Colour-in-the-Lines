import React, { Component } from "react";
import Form from "./Form";
import PalettesSelection from "../components/PalettesSelection";
import axios from "axios";
import Qs from "qs";
import shuffleArray from "../functions/shuffleArray";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      didFormSubmit: false,
      allPalettesArray: [],
      colourSelection: null,
      keyWordsArray: []
    };
  }

  // Display all of the information to the user
  setPalettes = (arrayOfPalettes, arrayOfKeyWords) => {

    // Query the API for synonyms related to each keyword passed from the text analyzer
    const keyWordPromises = [];
    arrayOfKeyWords.forEach(keyWord => {
      // Sometimes the analyzed keyword is multiple words
      const keyWordArray = keyWord
        .split(" ")
        .map(word => {
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
      });

      keyWordPromises.push(...keyWordArray)
    });

    // Take all of the synonyms and push them to state
    axios
      .all(keyWordPromises)
      .then(axios.spread((...responses) => {

        // Extract all keywords from an unknown amount of API requests
        const allSynonyms = [];
        responses.forEach(response => {
          allSynonyms.push(...response.data.noun.syn, ...response.data.verb.syn)
        });

        // If there are no synonyms, set the keyWordsArray state to an empty array
        if (allSynonyms.length) {
          // Shuffle the synonyms array (So the results aren't the same every form submission)
          this.setState({
            didFormSubmit: true,
            allPalettesArray: arrayOfPalettes,
            keyWordsArray: shuffleArray(allSynonyms)
          });
        } else {
          this.setState({
            didFormSubmit: true,
            allPalettesArray: arrayOfPalettes,
            keyWordsArray: []
          });
        }
      }))
      .catch(() => {
        // These colour descriptions aren't critical to the app
        // Push the other data over to the results instead
        this.setState({
          didFormSubmit: true,
          allPalettesArray: arrayOfPalettes,
          keyWordsArray: []
        });
      });
  };

  // Rerender when a colour has been chosen
  handleColourChoice = colour => {
    this.setState({
      colourSelection: colour
    });
  };

  render() {
    const { didFormSubmit, allPalettesArray, keyWordsArray, colourSelection} = this.state;

    return (
      <main className="flexGrid wrapper">
        <Form
          dataHandler={this.setPalettes}
          formFocusListener={this.props.formFocusListener}
          textBackground={colourSelection}
        />

        {didFormSubmit ? (
          <PalettesSelection
            palettesArray={allPalettesArray}
            colourButtonListener={this.handleColourChoice}
            keyWordsArray={keyWordsArray}
          />
        ) : null}
      </main>
    );
  }
}

export default Main;
