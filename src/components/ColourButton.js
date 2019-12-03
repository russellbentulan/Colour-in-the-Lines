import React from "react";
import cn from "classnames";
import getContrastRatio from '../functions/getContrastRatio';

function ColourButton(props) {

  const colors = {
    maroon: "#800000",
    red: "#e6194B",
    pink: "#fabebe",
    brown: "#9A6324",
    orange: "#f58231",
    apricot: "#ffd8b1",
    olive: "#808000",
    yellow: "#ffe119",
    beige: "#fffac8",
    lime: "#bfef45",
    green: "#3cb44b",
    mint: "#aaffc3",
    teal: "#469990",
    cyan: "#42d4f4",
    navy: "#000075",
    blue: "#4363d8",
    purple: "#911eb4",
    lavender: "#e6beff",
    magenta: "#f032e6",
    white: "#ffffff",
    grey: "#a9a9a9",
    black: "#000000"
  };

  const nearestColour = require('nearest-color').from(colors);
  const colourName = nearestColour(props.colour).name;
  const componentClass = cn(
    'ColourButton',
    {'ColourButton--selected': props.isChosen}
  ); 

  let colourNameArray = [colourName, props.descriptorWord];

  colourNameArray = (...colourNameArray) => {
    let m = colourNameArray.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [colourNameArray[m], colourNameArray[i]] = [
        colourNameArray[i],
        colourNameArray[m]
      ];
    }
    return colourNameArray;
  };

  return (
    <button
      className={componentClass}
      onClick={e => props.clickHandler(e, props.colour)}
      style={{
        color: getContrastRatio(props.colour),
        background: `#${props.colour}`
      }}
    >
      {props.descriptorWord ? colourNameArray.join(" ") : colourName}
    </button>
  );
}

export default ColourButton;
