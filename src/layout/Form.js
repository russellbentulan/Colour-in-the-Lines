import React, { Component } from "react";
import Qs from "qs";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stringToQuery: "",
      errorMessage: ""
    };
  }

  // Query the API with the user's input
  getColourPalettes = e => {
    e.preventDefault();

    // make sure the user has text to query the API
    if (this.state.stringToQuery) {
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
            keywords: this.state.stringToQuery,
            numResults: 10,
            format: "json"
          }
        }
      })
        .then(response => {
          // Check if there are matching palettes related to the search query
          if (response.data.length) {
            this.props.dataHandler(response.data);
          } else {
            this.setState({
              errorMessage: `Sorry, we couldn't find any palettes relating to your text, try something else like "Gone with the Wind" or "Kittens"`
            });
          }
        })
        .catch(error => {
          this.setState({
            errorMessage: `Sorry, something went wrong: ${error}.`
          });
        });
    } else {
      this.setState({
        errorMessage: `Please type something into the text field.`
      });
    }
  };

  // Update state when text is being input
  handleTextInput = e => {
    this.setState({
      stringToQuery: e.target.value
    });
  };

  // Check contrast ratio of colour before changing the background of the text input
  // Change the colour of the text to make it accessible
  getContrastRatio(hexcolor) {
    const r = parseInt(hexcolor.substr(0,2),16);
    const g = parseInt(hexcolor.substr(2,2),16);
    const b = parseInt(hexcolor.substr(4,2),16);
    const yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
  }

  render() {
    return (
      <section className="FormComponent">
        <div className="wrapper">
          <form
            className="FormComponent__form"
            onSubmit={this.getColourPalettes}
          >
            <label htmlFor="textInput" className="FormComponent__label">
              Enter your text
            </label>

            <textarea
              className="FormComponent__textarea"
              id="textInput"
              value={this.props.stringToQuery}
              onChange={this.handleTextInput}
              onFocus={this.props.formFocusListener}
              style={
                this.props.textBackground
                  ? {
                      background: `#${this.props.textBackground}`,
                      color: this.getContrastRatio(this.props.textBackground)
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
