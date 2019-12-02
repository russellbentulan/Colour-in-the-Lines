import React, { Component } from 'react';
import Form from './Form';
import PalettesSelection from '../components/PalettesSelection';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      didFormSubmit: false,
      allPalettesArray: [],
      colorSelection: null
    }
  }

  setPalettes = (data) => {
    this.setState({
      didFormSubmit: true,
      allPalettesArray: data
    })
  }

  handleColourChoice = (colour) => {
    this.setState({
      colorSelection: colour
    })
  }

  render() {
    const {
      didFormSubmit,
      allPalettesArray
    } = this.state

    return (
      <main>
        <Form 
          dataHandler={this.setPalettes} 
          formFocusListener={this.props.formFocusListener} 
          textBackground={this.state.colorSelection}/>

        {didFormSubmit ? (
          <PalettesSelection palettesArray={allPalettesArray} colourButtonListener={this.handleColourChoice} />
        ) : null}
      </main>
    );
  }
}

export default Main;