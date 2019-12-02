import React from "react";
import cn from "classnames";
import getContrastRatio from '../functions/getContrastRatio';

function ColourButton(props) {
  const componentClass = cn(
    'ColourButton',
    {'ColourButton--selected': props.isChosen}
  ); 
  return (
    <button
      className={componentClass}
      onClick={e => props.clickHandler(e, props.colour)}
      style={{
        color: getContrastRatio(props.colour),
        background: `#${props.colour}`
      }}
    >
      {props.colour}
    </button>
  );
}

export default ColourButton;
