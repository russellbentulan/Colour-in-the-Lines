import React, { Component } from "react";
import ColourButton from "./ColourButton";
import axios from "axios";
import Qs from 'qs';

class Palette extends Component {
  constructor(props) {
    super(props)

    this.state = {
      colourChoice: this.props.paletteInfo.colors[0],
      descriptorWords: []
    }

  }

  getDescriptorSynonyms = (word) => {
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
  }

  // WIP
  // Removes a random descriptor from the array and gives to to a ColourButton
  setRandomDescriptors = async () => {
    
    const { keyWordsArray } = this.props;

    const descriptionPromises = keyWordsArray.map(word => this.getDescriptorSynonyms(word));
    
    const setAllKeywords = keyWordsArray => {
      console.log(keyWordsArray);
    };

    setAllKeywords(await descriptionPromises);
  }

  // Sets the colour that is the current text box colour
  changeColourChoice = (e, colour) => {
    this.props.colourButtonListener(colour);
    this.setState({
      colourChoice: colour
    });
  }

  componentDidMount() {
    // this.setRandomDescriptors();
  }
  
  render() {
    return (
      <ul className="Palette">
        {[...this.props.paletteInfo.colors].map((colour, i) => (
          <li className="Palette__item" key={i}>
            <ColourButton
              isChosen={colour === this.state.colourChoice}
              colour={colour}
              clickHandler={this.changeColourChoice}
              descriptorWord={this.state.descriptorWords[i]}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default Palette;
