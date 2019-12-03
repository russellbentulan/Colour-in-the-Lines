import React, { Component } from "react";
import ColourButton from "./ColourButton";

class Palette extends Component {
  constructor(props) {
    super(props)

    this.state = {
      colourChoice: this.props.paletteInfo.colors[0]
    }
  }

  // Sets the colour that is the current text box colour
  changeColourChoice = (e, colour) => {
    this.props.colourButtonListener(colour);
    this.setState({
      colourChoice: colour
    });
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
              descriptorWord={this.props.keyWordsArray[i]}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default Palette;
