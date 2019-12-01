import React, { Component } from 'react';
import classNames from 'classnames';

class Palette extends Component {
  render() {
    const componentClass = classNames(
      'Palette', 
      {'Palette--selected': this.props.selected});

    return (
      <ul className={componentClass}>
        {this.props.paletteInfo.colors.map((color, i) => (
          <li 
            className="componentClass" 
            key={i}>

            <button
              className="Palette__button"
              data-color={color}
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