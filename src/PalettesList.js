import React from 'react';
import Palette from './Palette';


function PalettesList(props) {
  return (
    <section className="palette-list notSubmitted">
      {props.coloursArray.length ? (

        <ul className="palette-list__list">
          {props.coloursArray.map(palette => (
          <li key={palette.id}>
            <Palette 
              paletteInfo={palette}
            />
          </li>
          ))}
        </ul>

      ) : (
        <p>Sorry, we couldn't find anything for your search.</p>
      )}
    </section>
  )
}

export default PalettesList;