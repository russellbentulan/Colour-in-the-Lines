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
      onClick={props.clickHandler} 
      style={{background: `#${props.colour}`}}>{props.colour}</button>
  );
}

export default ColourButton;
