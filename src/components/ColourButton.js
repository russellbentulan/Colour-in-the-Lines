import React from "react";
import cn from "classnames";

function ColourButton(props) {
  const componentClass = cn(
    'ColourButton',
    {'ColourButton--selected': props.isChosen}
  ); 
  return(
    <button 
      className={componentClass} 
      onClick={e => props.clickHandler(e, props.colour)} 
      style={{background: `#${props.colour}`}}>{props.colour}</button>
  );
}

export default ColourButton;
