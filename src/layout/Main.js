import React, { Component } from 'react';
import Form from './Form';
import PalettesSelection from '../components/PalettesSelection';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      didFormSubmit: false,
      allPalettesArray: []
    }
  }

  setPalettes = (data) => {
    this.setState({
      didFormSubmit: true,
      allPalettesArray: data
    })
  }

  render() {
    const {
      didFormSubmit,
      allPalettesArray
    } = this.state

    return(
      <main>
        <Form 
          dataHandler={this.setPalettes}
        />

        {didFormSubmit ?
          <PalettesSelection 
            palettesArray={allPalettesArray}
          />
        :
          null
        }

      </main>
    );
  }
}

export default Main;