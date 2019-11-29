import React, { Component } from 'react';

class Palette extends Component {

  render() {
    return (
      <ul className="palette">
        {this.props.paletteInfo.colors.map((color, i) => (
          <li className="palette__item" key={i}>
            <button
              className="palette__button"
              style={{ backgroundColor: "#" + color }}
            >
              #{color}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default Palette;