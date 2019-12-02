import React from "react";
import cn from 'classnames';

function PaletteSelectionButton(props) {

  const componentClass = cn(
    'button',
    'PalettesSelectionButton',
    {'PalettesSelectionButton--disabled': props.disabled}
  );

  return (
    <button
      className={componentClass}
      disabled={props.disabled}
      onClick={e => props.selectionHandler(props.direction)}
    >
      {props.direction}
    </button>
  );
}

export default PaletteSelectionButton;
