import React, { Component } from "react";
import Qs from "qs";
import axios from "axios";
import getContrastRatio from "../functions/getContrastRatio";
// import analyzeText from "../functions/analyzeText";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stringToQuery: "",
      errorMessage: ""
    };
  }

  // Sets the error message within the form
  throwErrorMessage = error => {
    this.setState({
      errorMessage: error
    });
  };

  // Returns an array of keywords taken from the user's input
  analyzeText = () => {
    return axios({
      method: "post",
      url: process.env.REACT_APP_ENDPOINT,
      dataResponse: "json",
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.REACT_APP_API_KEY,
        "Content-Type": "application/json"
      },
      data: {
        documents: [
          {
            language: "en",
            id: "1",
            text: this.state.stringToQuery
          }
        ]
      }
    });
  };

  // Fetches the matching colour palette results to the extracted keywords
  getColourPalettes = analyzedText => {

    const keyWordsArray = analyzedText.data.documents[0].keyPhrases;

    let keyWords = "";
    if (!keyWordsArray.length) {
      // If there are no extracted keywords, use the original user text
      keyWords = this.state.stringToQuery;
    } else if (keyWordsArray.length === 1) {
      // If there is 1 extracted keyword, use that
      keyWords = keyWordsArray[0];
    } else {
      // Use two extracted keywords at most to get the best results
      keyWords = keyWordsArray[0] + " " + keyWordsArray[1];
    }

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
          keywords: keyWords,
          numResults: 10,
          format: "json"
        }
      }
    })
      .then(response => {
        // Check if there are matching palettes related to the search query
        if (response.data.length) {
          // pass data up to parent component
          this.props.dataHandler(response.data);

          // reset the error message
          this.setState({
            errorMessage: ''
          })
        } else {
          this.throwErrorMessage(
            `Sorry, we couldn't find any palettes relating to your text, try something else like "Gone with the Wind" or "Kittens"`
          );
        }
      })
      .catch(error => {
        this.throwErrorMessage(`Sorry, something went wrong: ${error}.`);
      });
  };

  // Query the API with thy keywords from the user's input
  handleFormSubmit = async e => {
    e.preventDefault();

    // make sure the user has text to query the API
    if (this.state.stringToQuery) {
      const analyzedText = await this.analyzeText();

      this.getColourPalettes(analyzedText);

    } else {
      this.throwErrorMessage(`Please type something into the text field.`);
    }
  };

  // Update state when text is being input
  handleTextInput = e => {
    this.setState({
      stringToQuery: e.target.value
    });
  };

  render() {
    return (
      <section className="FormComponent">
        <div className="wrapper">
          <form
            className="FormComponent__form"
            onSubmit={this.handleFormSubmit}
          >
            <label htmlFor="textInput" className="FormComponent__label">
              Enter your text
            </label>

            <textarea
              rows="4"
              className="FormComponent__textarea"
              id="textInput"
              value={this.props.stringToQuery}
              onChange={this.handleTextInput}
              onFocus={this.props.formFocusListener}
              style={
                this.props.textBackground
                  ? {
                      background: `#${this.props.textBackground}`,
                      color: getContrastRatio(this.props.textBackground)
                    }
                  : null
              }
            ></textarea>

            {this.state.errorMessage ? (
              <p className="FormComponent__error">{this.state.errorMessage}</p>
            ) : null}

            <button type="submit" className="button FormComponent__button">
              Get Colours
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default Form;
