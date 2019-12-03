import React, { Component } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';

import './styles/App.scss';

class App extends Component {
  
  constructor() {
    super();

    this.state = {
      didFormFocus: false
    }
  }

  // Animate the AppTitle component when the user focuses on the textarea
  handleFormFocus = () => {
    this.setState({didFormFocus: true});
  }

  render() {
    return (
      <>
        <Header formFocused={this.state.didFormFocus} />

        <Main formFocusListener={this.handleFormFocus} />

        <Footer />
      </>
    );
  }
}

export default App;
