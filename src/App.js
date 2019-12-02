import React, { Component } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';

import './styles/App.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {
      stringToQuery: '',
      palettesArray: []
    }
  }

  render() {
    return(
      <>
        <Header />

        <Main />
      </>
    );
  }
}

export default App;
