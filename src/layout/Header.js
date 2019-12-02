import React, { Component } from 'react';
import AppTitle from '../components/AppTitle';

class Header extends Component {
  render() {
    return (
      <header className="HeaderComponent">
        <section className="wrapper u-centerText">
          <AppTitle 
            expand={this.props.formFocused}
          />
        </section>
      </header>
    );
  }
}

export default Header;