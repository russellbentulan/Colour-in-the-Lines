import React, { Component } from 'react';

class Palette extends Component {

  render() {
    return (
      <ul className="palette">
        {this.props.paletteInfo.colors.map(color => ( 
          <li 
            style={{backgroundColor:'#' + color}} 
            class="palette__color">
            #{color}
          </li>
        ))}
      </ul>
    );
  }
}

export default Palette;