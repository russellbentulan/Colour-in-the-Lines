import React, { Component } from "react";
import ColourButton from "./ColourButton";

class Palette extends Component {
  constructor(props) {
    super(props)

    this.state = {
      colourChoice: 0
    }
  }

  changeColourChoice = (newIndex) => {
    this.setState({
      colourChoice: newIndex
    });
  }

  render() {
    return (
      <ul className="Palette">
        {this.props.paletteInfo.colors.map((colour, i) => (
          <li className="Palette__item" key={i}>
            <ColourButton
              isChosen={i === this.state.colourChoice}
              colour={colour}
              clickHandler={this.changeColourChoice}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default Palette;
