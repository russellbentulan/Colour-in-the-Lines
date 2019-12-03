import React, { Component } from "react";
import PalettesSelectionButton from "./PalettesSelectionButton";
import Palette from "./Palette";
import shuffleArray from '../functions/shuffleArray';


class PalettesSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      shuffledKeywords: this.props.keyWordsArray
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
        currentIndex: newIndex,
        shuffledKeywords: shuffleArray(this.state.shuffledKeywords)
      });
    }
  };

  render() {

    // this.showkeyWords(this.props.keyWordsArray);
    const currentPalette = this.props.palettesArray[this.state.currentIndex];
    return (
      <section className="PalettesSelection col-1-of-2--lg">
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
            keyWordsArray={this.state.shuffledKeywords}
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
