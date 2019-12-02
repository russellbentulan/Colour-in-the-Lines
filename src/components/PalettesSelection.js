import React, { Component } from "react";
import PalettesSelectionButton from "./PalettesSelectionButton";
import Palette from "./Palette";

class PalettesSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0
    };
  }

  // Change the current palette based on the direction button pressed
  changePalettes = direction => {
    const indexChange = {
      previous: this.state.currentIndex - 1,
      next: this.state.currentIndex + 1
    };

    // The new index in the palettes array
    const newIndex = indexChange[direction];

    // Make sure a non-existant index cannot be reached
    if (this.props.palettesArray[newIndex] !== undefined) {
      this.setState({
        currentIndex: newIndex
      });
    }
  };

  render() {

    const currentPalette = this.props.palettesArray[this.state.currentIndex];
    return (
      <section className="PalettesSelection">
        <div className="wrapper PalettesSelection__container">
          <div className="PalettesSelection__button PalettesSelection__button--left">
            <PalettesSelectionButton
              direction="previous"
              selectionHandler={this.changePalettes}
              disabled={this.state.currentIndex === 0 ? true : false}
            />
          </div>

          <Palette
            paletteInfo={currentPalette}
            colourButtonListener={this.props.colourButtonListener}
          />

          <div className="PalettesSelection__button PalettesSelection__button--right">
            <PalettesSelectionButton
              direction="next"
              selectionHandler={this.changePalettes}
              disabled={
                this.state.currentIndex === this.props.palettesArray.length - 1
                  ? true
                  : false
              }
            />
          </div>
        </div>
      </section>
    );
  }
}

export default PalettesSelection;
