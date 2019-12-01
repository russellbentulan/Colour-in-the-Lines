import React from 'react';
import showErrorMessage from '../showErrorMessage';

function Form(props) {
  const { formHandler, palettesQuery, textHandler, errorMessage } = props;
  return (
    <section className="userInput">
      <form className="userInput__form" onSubmit={formHandler}>

        <label htmlFor="textInput">Enter your text below</label>
        <input
          type="text"
          className="userInput__text"
          id="textInput"
          value={palettesQuery}
          onChange={textHandler}
          ></input>

        {errorMessage ? showErrorMessage(errorMessage) : null}
        
        <button type="submit" className="button userInput__button">Get Your Colours</button>
        
      </form>
    </section>
  );
} 

export default Form;